import Scroll from "@/components/base/scroll/scroll";
import DyBanner from "@/components/dypage/DyBanner/DyBanner";
import DyCategory from "@/components/dypage/DyCategory";
import LiveRoomList from "@/components/dypage/LiveRoomList";
import ScrollableTabsButtonAuto from "@/components/ScrollableTabsButtonAuto/ScrollableTabsButtonAuto";
import React, { useCallback, useEffect, useRef, useState } from "react";
import http from "../../http";
import { getDOMSize, getWindowSize } from "../../utils/index";
const liveRoomRefMap = {};
function DyTabs() {
  const [dyNavList, setDyNavList] = useState([
    { tag_id: 999, tag_name: "推荐", cate_id: 998, shortName: "tj" },
  ]);
  const LiveRoomListRef = useRef();
  const cateGoryRef = useRef(null);
  const type = useRef("tj");
  const requestData = useCallback(() => {
    const liveRoomListRequestFn =
      LiveRoomListRef.current[type.current].getLiveListData;;
    if (cateGoryRef && type.current === 'tj'){
      return [liveRoomListRequestFn, cateGoryRef.current.getCategoryData];
    }
      return liveRoomListRequestFn;
  }, [LiveRoomListRef]);

  const getNextPageData = useCallback(() => {
    return LiveRoomListRef.current[type.current].getNextLiveListData;
  }, [LiveRoomListRef]);

  useEffect(() => {
    if (dyNavList.length === 1) {
        getNavListData();
    }
    return () => {
    }
  });
  
 
  function getNavListData() {
    http("/cateList").then((res) => {
      setDyNavList((state) => state.concat(res.data));
    });
  }
  function onChange(newVal) {
    type.current = dyNavList[newVal].shortName;
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
          <DyCategory ref={cateGoryRef} />
          {/* 推荐直播列表 */}
          <LiveRoomList
            tagId={item.tag_id}
            cateId={item.cate_id}
            type={item.shortName}
            ref={LiveRoomListRef}
          />
        </div>
      ) : (
        <LiveRoomList
          tagId={item.tag_id}
          cateId={item.cate_id}
          type={item.shortName}
          ref={LiveRoomListRef}
        />
      );
    return (
      <Scroll
        pulldownRefresh={true}
        CalcHeight={computeRootHeight}
        pullDownRequestDataArg={item}
        key={item.cate_id}
        pullUpLoad={true}
        pulldownRequestData={requestData}
        getNextPageData={getNextPageData}
      >
        {Element}
      </Scroll>
    );
  };
  // function renderTabsContent() {
  //   return dyNavList.map(renderItem);
  // }
  return (
    <div className="HeaderTabsWrapper">
      <ScrollableTabsButtonAuto
        renderTabsContent={renderItem}
        tabs={dyNavList}
        keyName={"tag_name"}
        onChange={onChange}
      ></ScrollableTabsButtonAuto>
    </div>
  );
}
export default DyTabs;
