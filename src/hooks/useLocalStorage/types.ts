import type { Dispatch, SetStateAction } from "react";

export type UseLocalStorageResult<T> = readonly [T, Dispatch<SetStateAction<T>>];
