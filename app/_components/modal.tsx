import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect } from "react";

export default function Modal({
  children,
  onSelect,
  isOpen,
  style,
}: {
  children: ReactNode;
  onSelect: (modalAction: string) => void;
  isOpen: boolean;
  style: { container: string; closeButton: string };
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div className={style.container}>
      <button onClick={() => onSelect("close")} className={style.closeButton}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div>{children}</div>
    </div>
  );
}
