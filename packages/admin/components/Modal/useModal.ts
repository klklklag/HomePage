import { useCallback, useEffect, useState } from "react";

const getScrollPosition = () => {
  const { pageXOffset, pageYOffset } = window;
  const { scrollLeft: elementScrollX, scrollTop: elementScrollY } = document.documentElement;
  const { scrollLeft: bodyScrollX, scrollTop: bodyScrollY } = document.body;

  const x = pageXOffset || elementScrollX || bodyScrollX || 0;
  const y = pageYOffset || elementScrollY || bodyScrollY || 0;

  return [x, y];
};

const restoreScrollPosition = (x: number, y: number) => {
  window.scrollTo(x, y);
  document.documentElement.scrollTo(x, y);
  document.body.scrollTo(x, y);
};

export const useModal = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<{ x: number; y: number}>({ x: 0, y: 0 });

  const clearBodyCss = useCallback(() => {
    document.body.style.cssText = `
      position: "";
      top: "";
      left: "";
    `;
  }, []);

  const showModal = useCallback(() => {
    // const [currentScrollX, currentScrollY] = getScrollPosition();
    // setScrollPosition({ x: currentScrollX, y: currentScrollY });
    // document.body.style.cssText = `
    //   position: fixed;
    //   top: -${currentScrollY}px;
    //   left: -${currentScrollX}px;
    // `;
    
    setVisible(true);
  }, [setVisible, setScrollPosition]);

  const hideModal = useCallback(() => {
    // clearBodyCss();

    // const { x, y } = scrollPosition;
    // restoreScrollPosition(x, y);

    setVisible(false);
  }, [setVisible, scrollPosition]);

  // useEffect(() => {
  //   return clearBodyCss;
  // }, []);

  return [
    visible,
    // scrollPosition,
    showModal,
    hideModal,
  ] as const;
}