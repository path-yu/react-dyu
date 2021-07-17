import useToggleDisplay from "@/common/useToggleDisplay";
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import PullDown from '@better-scroll/pull-down';
import PropsTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import PullDownOptions from "./constancePulldown";
import "./scroll.scss";
import usePullDown from './use-pulldown';
BScroll.use(ObserveDOM);
let timer = null;
function Scroll(props) {
  const rootRef = useRef(null);
  let scrollRef = useRef(null);
  const [rootHeight, setRootHeight] = useState("100vh");
  const [rootWidth, setRootWidth] = useState("100vw");
  const { isPullingDown, beforePullDown, pullingDownHandler } = usePullDown(
    scrollRef,
    requestData
  );
  const {
    CalcHeight,
    direction,
    pulldownRefresh = false,
    // 传递给scroll 组件的选项
    options,
    pulldownRequestData, // 下拉刷新请求数据
    pullDownRequestDataArg,
  } = props;
  useEffect(() => {
    let BScrollOption = {};
    if (pulldownRefresh && direction === "y") {
      BScrollOption = { ...PullDownOptions };
      BScroll.use(PullDown);
    }

    if (direction === "y" && CalcHeight) {
      setRootHeight(CalcHeight());
    }

    const scrollVal = new BScroll(rootRef.current, {
      observeDOM: true,
      ...options,
      ...BScrollOption,
    });
    scrollRef.current = scrollVal;
    if (pulldownRefresh) {
      scrollVal.on("pullingDown", pullingDownHandler);
    }
    return () => {
      scrollVal.destroy();
    };
  }, [pulldownRequestData, props.children]);

  function requestData() {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        pulldownRequestData && pulldownRequestData(pullDownRequestDataArg);
        resolve();
      }, 1000);
    });
  }
  if (direction === "y" && pulldownRefresh) {
    const ele = (
      <div
        className=" rootRef pulldown-bswrapper"
        style={{ height: rootHeight }}
        ref={rootRef}
      >
        <div className="pulldown-scroller">
          <div className="pulldown-wrapper">
            <div style={useToggleDisplay(beforePullDown)}>
              <span>Pull Down and refresh</span>
            </div>
            <div style={useToggleDisplay(!beforePullDown)}>
              <div style={useToggleDisplay(isPullingDown)}>
                <span>Loading...</span>
              </div>
              <div style={useToggleDisplay(!isPullingDown)}>
                <span>Refresh success</span>
              </div>
            </div>
          </div>
          <div className="pulldown-list">{props.children}</div>
        </div>
      </div>
    );
    return ele;
  }
  return direction === "y" ? (
    <div
      className="rootRef"
      style={{ height: rootHeight, overflow: "hidden" }}
      ref={rootRef}
    >
      <div className="scroll_wrapper"> {props.children}</div>
    </div>
  ) : (
    <div
      className="rootRef horizontal"
      ref={rootRef}
    >
      {props.children}
    </div>
  );
}
Scroll.propTypes = {
  CalcHeight: PropsTypes.func, // 计算根组件需要设置的高度函数 返回 XXXpx;
  direction: PropsTypes.string, //scroll 组件滚动方向 x或者 y
  pulldownRefresh: PropsTypes.bool, // 是否开启下拉属性
  options: PropsTypes.object,
  pulldownRequestData: PropsTypes.func, //传递给scroll 组件的选项
};
Scroll.defaultProps = {
  direction: "y",
  pulldownRefresh: false,
  option: {},
  pulldownRequestData: null,
};
export default Scroll;
