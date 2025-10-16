// src\stores\adminCourses.ts
import { defineStore } from 'pinia'
import api from '@/services/api'
import { useAdminStore } from './admin'

// Base course interface (from API)
export interface AdminCourse {
  id: number
  title: string
  description: string
  price: number
  video_url?: string
  video_path?: string
  thumbnail?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Used when submitting form data (supports File uploads)
export type AdminCourseForm = Omit<Partial<AdminCourse>, 'thumbnail' | 'price' | 'video_path'> & {
  thumbnail?: File | string | null
  video_path?: File | string | null
  price?: number | string
  thumbnailPreview?: string
}

export interface CoursesResponse {
  success: boolean
  message: string
  data: {
    data: AdminCourse[]
    current_page: number
    total: number
    per_page: number
    last_page: number
  }
}

export interface CreateCourseResponse {
  success: boolean
  message: string
  data: {
    course: AdminCourse
  }
}

export interface UpdateCourseResponse {
  success: boolean
  message: string
  data: {
    course: AdminCourse
  }
}

export const useAdminCoursesStore = defineStore('adminCourses', {
  state: () => ({
    courses: [] as AdminCourse[],
    currentPage: 1,
    total: 0,
    perPage: 10,
    lastPage: 1,
    loading: false
  }),

  getters: {
    totalCourses: (state) => state.total,
    adminTotalCourses: () => useAdminStore().totalCourses ?? 0
  },

  actions: {
    async fetchCourses(page = 1, filters: Record<string, any> = {}) {
      this.loading = true
      try {
        const params = { page, per_page: this.perPage, ...filters }
        const { data } = await api.get<CoursesResponse>('/admin/courses', { params })
        this.courses = data.data.data
        this.currentPage = data.data.current_page
        this.total = data.data.total
        this.perPage = data.data.per_page
        this.lastPage = data.data.last_page
        return data.data
      } catch (error) {
        console.error('Failed to fetch courses:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchCourses(query: string, otherFilters: Record<string, any> = {}) {
      const filters = { search: query, ...otherFilters }
      return this.fetchCourses(1, filters)
    },

    async createCourse(data: AdminCourseForm) {
      try {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
          if ((key === 'thumbnail' || key === 'video_path') && value instanceof File) {
            formData.append(key, value)
          } else if (value !== undefined && value !== null && key !== 'thumbnailPreview') {
            let val: any = value
            if (key === 'price') val = parseFloat(val).toFixed(2)
            if (key === 'is_active') val = (val as boolean) ? '1' : '0'
            formData.append(key, String(val))
          }
        })

        const { data: response } = await api.post<CreateCourseResponse>(
          '/admin/courses',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        await this.fetchCourses(this.currentPage)
        return response.data.course
      } catch (error) {
        console.error('Failed to create course:', error)
        throw error
      }
    },

    async updateCourse(id: number, data: AdminCourseForm) {
      try {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
          if ((key === 'thumbnail' || key === 'video_path') && value instanceof File) {
            formData.append(key, value)
          } else if (value !== undefined && value !== null && key !== 'thumbnailPreview') {
            let val: any = value
            if (key === 'price') val = parseFloat(val).toFixed(2)
            if (key === 'is_active') val = (val as boolean) ? '1' : '0'
            formData.append(key, String(val))
          }
        })

        const { data: response } = await api.post<UpdateCourseResponse>(
          `/admin/courses/${id}?_method=PUT`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        await this.fetchCourses(this.currentPage)
        return response.data.course
      } catch (error) {
        console.error('Failed to update course:', error)
        throw error
      }
    },

    async deleteCourse(id: number) {
      try {
        await api.delete(`/admin/courses/${id}`)
        await this.fetchCourses(this.currentPage)
        return true
      } catch (error) {
        console.error('Failed to delete course:', error)
        throw error
      }
    },

    async nextPage() {
      if (this.currentPage < this.lastPage) {
        return this.fetchCourses(this.currentPage + 1)
      }
    },

    async prevPage() {
      if (this.currentPage > 1) {
        return this.fetchCourses(this.currentPage - 1)
      }
    }
  }
})