import useToggleDisplay from "@/common/useToggleDisplay";
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import React, { useEffect, useRef, useState } from "react";
import "./Test.scss";
BScroll.use(PullDown);

function generateData() {
  const BASE = 30;
  const begin = BASE * STEP;
  const end = BASE * (STEP + 1);
  let ret = [];
  for (let i = end; i > begin; i--) {
    ret.push(i);
  }
  return ret;
}

const TIME_BOUNCE = 800;
const REQUEST_TIME = 1000;
const THRESHOLD = 70;
const STOP = 56;
let STEP = 0;
let dataList = generateData();
console.log(dataList);
export default function UserPage() {
  const scroll = useRef(null);
  const bsScrollRef = useRef(null);
  const [beforePullDown, setBeforePullDown] = useState(true);
  const [isPullingDown, setIsPullingDown] = useState(false);
  useEffect(() => {
    const bscroll = (bsScrollRef.current = new BScroll(scroll.current, {
      scrollY: true,
      bounceTime: TIME_BOUNCE,
      useTransition: false,
    }));

    bscroll.on("pullingDown", pullingDownHandler);
    bscroll.on("scroll", scrollHandler);
    bscroll.on("scrollEnd", (e) => {
      console.log("scrollEnd");
    });
  }, []);
  function scrollHandler(pos) {
    console.log(pos.y);
  }
  async function pullingDownHandler() {
    console.log("trigger pullDown");
    setBeforePullDown(false);
    setIsPullingDown(true);
    STEP += 1;

    await requestData();

    setBeforePullDown(false);
    finishPullDown();
  }
  async function finishPullDown() {
    bsScrollRef.current.finishPullDown();
    setTimeout(() => {
      setBeforePullDown(true);
      bsScrollRef.current.refresh();
    }, TIME_BOUNCE + 100);
  }
  async function requestData() {
    try {
      const newData = await ajaxGet(/* url */);
      dataList = newData.concat(dataList);
    } catch (err) {
      // handle err
      console.log(err);
    }
  }
  function ajaxGet(/* url */) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dataList = generateData();
        resolve(dataList);
      }, REQUEST_TIME);
    });
  }
  return (
    <div className="pulldown">
      <div className="pulldown-bswrapper" ref={scroll}>
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
          <ul className="pulldown-list">
            {dataList.map((v, i) => {
              return (
                <li
                  key={i}
                  onClick={() => alert("tess444444444sst")}
                  className="pulldown-list-item"
                >{`I am item ${i} `}</li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
