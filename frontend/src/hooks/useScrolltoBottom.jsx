import { useEffect, useState } from "react";

const useScrollToBottom = (ref) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    if (ref.current) {
        //   ref.current.scrollTop = ref.current.scrollHeight;
         ref.current.scrollTop =
           ref.current.scrollHeight - ref.current.clientHeight;
    }
  };

  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop < scrollHeight - clientHeight - 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
      return () => {
         if (ref.current) {
           // Check if ref.current is not null
           ref.current.removeEventListener("scroll", handleScroll);
         }
      };
    }
  }, [ref]);

  return { showScrollButton, scrollToBottom };
};

export default useScrollToBottom;
