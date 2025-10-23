import { defineStore } from 'pinia'
import api from '@/services/api'

export interface AdminBlog {
  id: number
  title: string
  body: string
  image?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export type AdminBlogForm = Partial<AdminBlog> & {
  image?: File | string | null
  imagePreview?: string
}

export interface BlogsResponse {
  success: boolean
  message: string
  data: {
    data: AdminBlog[]
    current_page: number
    total: number
    per_page: number
    last_page: number
  }
}

export interface CreateBlogResponse {
  success: boolean
  message: string
  data: {
    blog: AdminBlog
  }
}

export interface UpdateBlogResponse {
  success: boolean
  message: string
  data: {
    blog: AdminBlog
  }
}

export const useAdminBlogsStore = defineStore('adminBlogs', {
  state: () => ({
    blogs: [] as AdminBlog[],
    currentPage: 1,
    total: 0,
    perPage: 10,
    lastPage: 1,
    loading: false
  }),

  getters: {
    totalBlogs: (state) => state.total,
  },

  actions: {
    async fetchBlogs(page = 1, filters: Record<string, any> = {}) {
      this.loading = true
      try {
        const params = { page, per_page: this.perPage, ...filters }
        const { data } = await api.get<BlogsResponse>('/admin/blogs', { params })
        this.blogs = data.data.data
        this.currentPage = data.data.current_page
        this.total = data.data.total
        this.perPage = data.data.per_page
        this.lastPage = data.data.last_page
        return data.data
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchBlogs(query: string, otherFilters: Record<string, any> = {}) {
      const filters = { search: query, ...otherFilters }
      return this.fetchBlogs(1, filters)
    },

    async createBlog(data: AdminBlogForm) {
      try {
        const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            key !== 'imagePreview' &&
            typeof value !== 'boolean' &&
            typeof value !== 'function'
        ) {
            if (
            key === 'image' &&
            typeof File !== 'undefined' &&
            (value as unknown) instanceof File
            ) {
            formData.append(key, value as File)
            } else {
            formData.append(key, String(value))
            }
        }
        })


        const { data: response } = await api.post<CreateBlogResponse>(
          '/admin/blogs',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        await this.fetchBlogs(this.currentPage)
        return response.data.blog
      } catch (error) {
        console.error('Failed to create blog:', error)
        throw error
      }
    },

    async updateBlog(id: number, data: AdminBlogForm) {
      try {
        const formData = new FormData()

       Object.entries(data).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            key !== 'imagePreview' &&
            typeof value !== 'boolean' &&
            typeof value !== 'function'
        ) {
            if (
            key === 'image' &&
            typeof File !== 'undefined' &&
            (value as unknown) instanceof File
            ) {
            formData.append(key, value as File)
            } else {
            formData.append(key, String(value))
            }
        }
        })


        const { data: response } = await api.post<UpdateBlogResponse>(
          `/admin/blogs/${id}?_method=PUT`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        await this.fetchBlogs(this.currentPage)
        return response.data.blog
      } catch (error) {
        console.error('Failed to update blog:', error)
        throw error
      }
    },

    async deleteBlog(id: number) {
      try {
        await api.delete(`/admin/blogs/${id}`)
        await this.fetchBlogs(this.currentPage)
        return true
      } catch (error) {
        console.error('Failed to delete blog:', error)
        throw error
      }
    },

    async nextPage() {
      if (this.currentPage < this.lastPage) {
        return this.fetchBlogs(this.currentPage + 1)
      }
    },

    async prevPage() {
      if (this.currentPage > 1) {
        return this.fetchBlogs(this.currentPage - 1)
      }
    }
  }
})