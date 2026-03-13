import type { ReactNode } from "react";

export type NoticeTone = "neutral" | "info" | "success" | "warning" | "error";

export type NoticeRole = "status" | "alert";

export type NoticeProps = {
  children: ReactNode;
  tone?: NoticeTone;
  role?: NoticeRole;
  className?: string;
};
