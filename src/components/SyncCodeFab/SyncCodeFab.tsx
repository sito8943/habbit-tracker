import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../Button";
import type { SyncCodeFabProps } from "./types";
import styles from "./SyncCodeFab.module.css";

const SyncCodeFab = ({ animate, onClick }: SyncCodeFabProps) => {
  return (
    <div className={styles.container}>
      <IconButton
        onClick={onClick}
        variant="filled"
        color="primary"
        aria-label="Open recovery code"
        title="Open recovery code"
        className={`${styles.btn} ${animate ? styles.buzz : ""}`}
      >
        <FontAwesomeIcon icon={faKey} />
      </IconButton>
    </div>
  );
};

export default SyncCodeFab;
