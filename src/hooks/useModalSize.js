import { useEffect, useState } from "react";

const useModalSize = () => {
  const [modalSize, setModalSize] = useState("");

  useEffect(() => {
    const getSize = () => {
      if (window.innerWidth < 640) {
        setModalSize("small");
      } else if (window.innerWidth < 1024) {
        setModalSize("medium");
      } else {
        setModalSize("large");
      }
    };
    getSize();
    window.addEventListener("resize", getSize);

    return () => window.removeEventListener("resize", getSize);
  }, []);

  return modalSize;
};

export default useModalSize;
