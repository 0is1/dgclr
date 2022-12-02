import { useCallback, useState, useEffect } from "react";

function useWindowSize() {
  const isClient = typeof window === "object";
  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : null,
      height: isClient ? window.innerHeight : null,
      scrollHeight: isClient
        ? document.getElementsByTagName("body")[0].scrollHeight
        : null,
    }),
    [isClient]
  );
  const [windowSize, setWindowSize] = useState(getSize);
  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
