import { useEffect } from "react";

export const useHotKey = (
  key: string,
  handler: (event: KeyboardEvent) => void
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === key) {
      handler(event);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
