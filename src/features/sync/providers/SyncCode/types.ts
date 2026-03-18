import type { ReactNode } from "react";

export type SyncCodeContextType = {
  code: string;
  setCode: (nextCode: string) => boolean;
};

export type SyncCodeProviderProps = {
  children: ReactNode;
};
