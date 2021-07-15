import useToggleDisplay from "@/common/useToggleDisplay";
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import PropsTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import "./scroll.scss";
import usePullDown from "./use-pulldown";
BScroll.use(ObserveDOM);
function Scroll(props) {
  const rootRef = useRef(null);
  let [scrollRef, setScrollRef] = useState(null);
  const [rootHeight, setRootHeight] = useState("100vh");
  const [rootWidth, setRootWidth] = useState("100vw");

  const {
    CalcHeight,
    direction,
    pulldownRefresh = false,
    // 传递给scroll 组件的选项
    options, //
  } = props;

  useEffect(() => {
    if (direction === "y" && CalcHeight) {
      setRootHeight(CalcHeight());
    }
    const scrollVal =  new BScroll(rootRef.current, {
      observeDOM: true,
      ...options,
      scrollY:true
    });
    // if(scrollRef === null) setScrollRef(scrollVal);
    return () => {
      scrollVal.destroy();
    };
  }, []);
  console.log('scroll');

  if (direction === "y" && pulldownRefresh) {
    const {
      isPullingDown,
      beforePullDown,
      setBeforePullDown,
      setIsPullingDown,
    } = usePullDown(scrollRef);
    const { disPlayStyle: showOne } = useToggleDisplay(beforePullDown);
    const { disPlayStyle: showTwo } = useToggleDisplay(!beforePullDown);
    const { disPlayStyle: showThree } = useToggleDisplay(isPullingDown);
    const { disPlayStyle: showFour } = useToggleDisplay(!isPullingDown);
    const ele = (
      <div
        className=" rootRef pulldown-bswrapper"
        style={{ height: rootHeight }}
        ref={rootRef}
      >
        <div className="pulldown-scroller">
          <div className="pulldown-wrapper">
            <div style={showOne}>
              <span>Pull Down and refresh</span>
            </div>
            <div style={showTwo}>
              <div style={showThree}>
                <span>Loading...</span>
              </div>
              <div style={showFour}>
                <span>Refresh success</span>
              </div>
            </div>
          </div>
          <div className="pulldown-list">{props.children}</div>
        </div>
      </div>
    );
  }
  return direction === "y" ? (
    <div className="rootRef" style={{ height: rootHeight }} ref={rootRef}>
      <div className="scroll_wrapper"> {props.children}</div>
    </div>
  ) : (
    <div
      className="rootRef horizontal"
      style={{ width: rootWidth }}
      ref={rootRef}
    >
      <div className="scroll_wrapper"> {props.children}</div>
    </div>
  );
}
Scroll.propTypes = {
  CalcHeight: PropsTypes.func, // 计算根组件需要设置的高度函数 返回 XXXpx;
  direction: PropsTypes.string, //scroll 组件滚动方向 x或者 y
  pulldownRefresh: PropsTypes.bool, // 是否开启下拉属性
  options: PropsTypes.object, //传递给scroll 组件的选项
};
Scroll.defaultProps = {
  direction: "y",
  pulldownRefresh: false,
  option: {},
};
export default Scroll;
