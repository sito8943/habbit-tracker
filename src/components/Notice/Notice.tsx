import { toneClasses } from "./constants";
import type { NoticeProps } from "./types";
import { cx } from "./utils";

const Notice = ({ children, tone = "neutral", role = "status", className }: NoticeProps) => {
  return (
    <p role={role} className={cx("rounded border px-2 py-1 text-sm", toneClasses[tone], className)}>
      {children}
    </p>
  );
};

export default Notice;
