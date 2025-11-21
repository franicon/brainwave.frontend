export declare const useLoadingStore: import("pinia").StoreDefinition<"loading", Pick<{
    isLoading: import("vue").Ref<boolean, boolean>;
    start: () => void;
    stop: () => void;
    wrap: <T>(asyncFn: () => Promise<T>) => Promise<T | undefined>;
}, "isLoading">, Pick<{
    isLoading: import("vue").Ref<boolean, boolean>;
    start: () => void;
    stop: () => void;
    wrap: <T>(asyncFn: () => Promise<T>) => Promise<T | undefined>;
}, never>, Pick<{
    isLoading: import("vue").Ref<boolean, boolean>;
    start: () => void;
    stop: () => void;
    wrap: <T>(asyncFn: () => Promise<T>) => Promise<T | undefined>;
}, "start" | "stop" | "wrap">>;
