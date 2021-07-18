import ScrollableTabsButtonAuto from "@/components/ScrollableTabsButtonAuto/ScrollableTabsButtonAuto";
import React, { useCallback, useEffect, useRef, useState } from "react";
import http from "../../http";
import { getDOMSize, getWindowSize } from "../../utils/index";
import Scroll from "../base/scroll/scroll";
import DyBanner from "./DyBanner/DyBanner";
import DyCategory from "./DyCategory";
import LiveRoomList from "./LiveRoomList";
function DyTabs() {
  const [dyNavList, setDyNavList] = useState([
    { tag_id: "1", tag_name: "推荐" },
  ]);
  const ref = useRef();

  const requestData = useCallback(() => {
    return ref.current.getData;
  }, [ref.current]);

  useEffect(() => {
    if (dyNavList.length === 1) {
      getNavListData();
    }
  }, [dyNavList.length]);
  function getNavListData() {
    http("/cateList").then((res) => {
      setDyNavList((state) => state.concat(res.data));
    });
  }

  // 计算scroll 组件根wrapper的高度, 好达到滚动的高度
  function computeRootHeight(calcHeight) {
    const tabsHeight = getDOMSize(".tabsWrapper")[1];
    const res = getWindowSize()[1] - tabsHeight;
    return res + "px";
  }
  const renderItem = (item, index) => {
    const Element =
      item.tag_name === "推荐" ? (
        <div>
          {/* 轮播图 */}
          <DyBanner />
          {/*  分类列表 */}
          <DyCategory />
          {/* 推荐直播列表 */}
          <LiveRoomList
            tagId={item.tag_id}
            cateId={item.cate_id}
            type={item.shortName}
            ref={ref}
            index={index}
          />
        </div>
      ) : (
        <LiveRoomList
          tagId={item.tag_id}
          cateId={item.cate_id}
          type={item.shortName}
          ref={ref}
          index={index}
        />
      );
    return (
      <Scroll
        pulldownRefresh={true}
        CalcHeight={computeRootHeight}
        pullDownRequestDataArg={item}
        key={index}
        childRef={ref}
        pullUpLoad={true}
        pulldownRequestData={requestData}
      >
        {Element}
      </Scroll>
    );
  };
  function renderTabsContent() {
    return dyNavList.map(renderItem);
  }
  return (
    <div className="HeaderTabsWrapper">
      <ScrollableTabsButtonAuto
        renderTabsContent={renderItem}
        tabs={dyNavList}
        keyName={"tag_name"}
      ></ScrollableTabsButtonAuto>
    </div>
  );
}
export default DyTabs;
