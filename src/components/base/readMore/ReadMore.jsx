import { appBarIconStyle } from "@/common/material-icon-style";
import { ExpandMore } from "@material-ui/icons";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

export default function ReadMore(props) {
  const { richText, TextColor = "", maxHeight = 110 } = props;
  const IconStyle = appBarIconStyle();
  const [opacity, setOpacity] = useState(0);
  const [rotate, setRotate] = useState("0deg");

  const richContainerRef = useRef(null);
  const [height, setHeight] = useState(maxHeight);
  const [messageText, setMessageText] = useState("展开阅读更多");
  const richContentHeight = useRef(null);
  const isIInitRender = useRef(false);
  const computedStyle = useMemo(() => {
    const style = {
      color: "#606266",
      opacity: opacity,
      overflow: height >= maxHeight ? "hidden" : "none",
      height,
      transition: "all 0.3s",
    };

    return style;
  }, [height, opacity]);
  const top = rotate === "0deg" ? "-1.38888889rem" : "-0.55555556rem";

  const backgroundStyle =
    rotate === "0deg"
      ? "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 80%)"
      : "transparent";
  const isShowToggle = richContentHeight.current >= maxHeight ? true : false;
  useLayoutEffect(() => {
    const richContentOffsetHeight = (richContentHeight.current =
      richContainerRef.current.offsetHeight);
    if (richContentOffsetHeight >= maxHeight) {
      setHeight(maxHeight);
    } else {
      setHeight(richContentHeight.current);
    }
    setOpacity(1);
  }, []);
  function handleClick() {
    if (rotate === "0deg") {
      setRotate("180deg");
      setMessageText("收起");
      setHeight(richContentHeight.current + "px");
    } else {
      setRotate("0deg");
      setMessageText("展开阅读更多");
      setHeight(maxHeight + "px");
    }
  }

  return (
    <div style={{ height: height }}>
      <div style={computedStyle}>
        <div
          ref={richContainerRef}
          dangerouslySetInnerHTML={{ __html: richText }}
        ></div>
      </div>
      {isShowToggle && (
        <div
          className="relative text-blue-500 text-center flex justify-center items-end "
          style={{
            height: "1.38888889rem",
            top: top,
            background: backgroundStyle,
          }}
        >
          <div
            onClick={handleClick}
            className="flex justify-between items-center"
          >
            <span>{messageText}</span>
            <div
              className="transition-all"
              style={{ transform: `rotate(${rotate})` }}
            >
              <ExpandMore className={IconStyle.root}></ExpandMore>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
