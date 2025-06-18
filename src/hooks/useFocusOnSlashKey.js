import { useEffect } from "react";

const useFocusOnSlashKey = inputRef => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputRef]);
};

export default useFocusOnSlashKey;
