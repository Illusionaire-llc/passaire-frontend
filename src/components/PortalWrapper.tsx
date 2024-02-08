import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PortalWrapper = ({
  elementId,
  children,
}: {
  elementId: string;
  children: ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [wrapperElement, setWrapperElement] = useState(
    document.getElementById(elementId)
  );

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    setWrapperElement(document.getElementById(elementId));
  }, [elementId]);

  return isMounted ? createPortal(children, wrapperElement as Element) : null;
};

export default PortalWrapper;
