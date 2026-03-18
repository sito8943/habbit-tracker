import type { NoticeProps } from "./types";
import { cx } from "./utils";
import styles from "./Notice.module.css";

const Notice = ({ children, tone = "neutral", role = "status", className }: NoticeProps) => {
  return (
    <p role={role} className={cx(styles.base, styles[tone], className)}>
      {children}
    </p>
  );
};

export default Notice;
