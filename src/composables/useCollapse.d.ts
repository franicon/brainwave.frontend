export declare function useCollapse(): {
    isCollapsed: import("vue").Ref<boolean, boolean>;
    isMobile: import("vue").Ref<boolean, boolean>;
    toggleCollapse: () => void;
    showLabels: import("vue").ComputedRef<boolean>;
};
