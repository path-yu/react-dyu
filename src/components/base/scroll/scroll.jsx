import useToggleDisplay from "@/common/useToggleDisplay";
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import PullDown from "@better-scroll/pull-down";
import PullUp from "@better-scroll/pull-up";
import PropsTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import PullDownOptions from "./constancePulldown";
import "./scroll.scss";
import usePullDown from "./use-pulldown";
import usePullUp from "./use-pullUp";
BScroll.use(ObserveDOM);
let timer = null;
function Scroll(props) {
  const {
    CalcHeight,
    direction,
    pulldownRefresh,
    // 传递给scroll 组件的选项
    options,
    pulldownRequestData,
    pullUpLoad,
    getNextPageData,
  } = props;
  const rootRef = useRef(null);
  let scrollRef = useRef(null);
  const [rootHeight, setRootHeight] = useState("100vh");
  const [rootWidth, setRootWidth] = useState("100vw");
  const { isPullingDown, beforePullDown, pullingDownHandler } = usePullDown(
    scrollRef,
    wrapperCallback(500, pulldownRequestData)
  );
  const { isPullUpLoad, pullingUpHandler, isLoadingMore } = usePullUp(
    scrollRef,
    wrapperCallback(500, getNextPageData),
  );

  useEffect(() => {
    let BScrollOption = {};

    if (pulldownRefresh && direction === "y") {
      BScrollOption = { ...PullDownOptions };
      BScroll.use(PullDown);
    }
    if (pullUpLoad && direction === "y") {
      BScroll.use(PullUp);
    }
    if (direction === "y" && CalcHeight) {
      setRootHeight(CalcHeight());
    }

    const scrollVal = new BScroll(rootRef.current, {
      observeDOM: true,
      ...options,
      ...BScrollOption,
      pullUpLoad,
    });
    scrollRef.current = scrollVal;

    if (pulldownRefresh) {
      scrollVal.on("pullingDown", pullingDownHandler);
    }
    if (pullUpLoad) {
      scrollVal.on("pullingUp", pullingUpHandler);
    }
    return () => {
      scrollVal.destroy();
    };
  }, []);

  function wrapperCallback(delay, requestDataCallback) {
    let timer = null;
    return function () {
      return new Promise((resolve) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          const res = await requestDataCallback()();
          resolve(res);
        }, delay);
      });
    };
  }
  const pullupTips = (
    <div className="pullup-tips">
      {!isPullUpLoad && isLoadingMore ? (
        <div className="before-trigger">
          <span className="pullup-txt">Pull up and load more</span>
        </div>
      ) : (
        isPullUpLoad &&
        isLoadingMore && (
          <div className="after-trigger">
            <span className="pullup-txt">Loading...</span>
          </div>
        )
      )}
      <div style={useToggleDisplay(!isLoadingMore)}>我也是有底线的</div>
    </div>
  );
  if (direction === "y" && pullUpLoad && !pulldownRefresh) {
    return (
      <div
        className=" rootRef pulldown-bswrapper"
        style={{ height: rootHeight }}
        ref={rootRef}
      >
        <div className="pulldown-scroller">
          <div className="pulldown-list">{props.children}</div>
          {pullupTips}
        </div>
      </div>
    );
  }
  
  if (direction === "y" && pulldownRefresh && !pullUpLoad) {
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
  if (direction === "y" && pullUpLoad && pulldownRefresh) {
    return (
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
          {pullupTips}
        </div>
      </div>
    );
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
    <div className="rootRef horizontal" ref={rootRef}>
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
  pullUpLoad: PropsTypes.bool,
};
Scroll.defaultProps = {
  direction: "y",
  pulldownRefresh: false,
  option: {},
  pulldownRequestData: null,
  pullUpLoad: false,
};
export default Scroll;
