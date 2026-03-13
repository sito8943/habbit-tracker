import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../Button";
import type { SyncCodeFabProps } from "./types";

const SyncCodeFab = ({ animate, onClick }: SyncCodeFabProps) => {
  return (
    <div className="fixed right-6 bottom-6 z-30">
      <IconButton
        onClick={onClick}
        variant="filled"
        color="primary"
        aria-label="Open recovery code"
        title="Open recovery code"
        className={`h-12 w-12 rounded-full text-base shadow-lg ${animate ? "fab-buzz-once" : ""}`}
      >
        <FontAwesomeIcon icon={faKey} />
      </IconButton>
    </div>
  );
};

export default SyncCodeFab;
