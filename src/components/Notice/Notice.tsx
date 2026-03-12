import type { ReactNode } from "react";

type NoticeTone = "neutral" | "info" | "success" | "warning" | "error";

type NoticeRole = "status" | "alert";

type NoticeProps = {
  children: ReactNode;
  tone?: NoticeTone;
  role?: NoticeRole;
  className?: string;
};

const toneClasses: Record<NoticeTone, string> = {
  neutral: "border-border bg-base-light text-text",
  info: "border-bg-info bg-bg-info text-info",
  success: "border-bg-success bg-bg-success text-success",
  warning: "border-bg-warning bg-bg-warning text-warning",
  error: "border-error bg-bg-error text-error",
};

const cx = (...classes: Array<string | undefined>): string => classes.filter(Boolean).join(" ");

const Notice = ({ children, tone = "neutral", role = "status", className }: NoticeProps) => {
  return (
    <p role={role} className={cx("rounded border px-2 py-1 text-sm", toneClasses[tone], className)}>
      {children}
    </p>
  );
};

export default Notice;
