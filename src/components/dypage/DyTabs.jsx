import { Tabs, WhiteSpace } from "antd-mobile";
import React, { useEffect, useState } from "react";
import http from "../../http";
import { getDOMSize, getWindowSize } from "../../utils/index";
import Scroll from "../base/scroll/scroll";
import DyHome from "./DyHome";
import LiveRoomList from "./LiveRoomList";
function DyTabs() {
  const [dyNavList, setDyNavList] = useState([
    { tag_id: "0", tag_name: "全部" },
    { tag_id: "1", tag_name: "推荐" },
  ]);
  function getNavListData() {
    http("/cateList").then((res) => {
      setDyNavList((state) => state.concat(res.data));
    });
  }
  useEffect(() => {
    if (dyNavList.length === 2) {
      getNavListData();
    }
  },[]);
  // 计算scroll 组件根wrapper的高度, 好达到滚动的高度
  function computeRootHeight(calcHeight) {
    const HeaderTopHeight = getDOMSize(".HeaderTop")[1];
    const tabsHeight = getDOMSize(
      ".HeaderTabsWrapper .am-tabs-tab-bar-wrap"
    )[1];
    const res = getWindowSize()[1] - HeaderTopHeight - tabsHeight - 20;
    return res + "px";
  }
  function renderTabsContent() {
    return dyNavList.map((item, index) => {
      const Element =
        item.tag_name === "推荐" ? (
          <DyHome />
        ) : (
          <LiveRoomList
            key={index}
            tagId={item.tag_id}
            api="subLiveList"
            cateId={item.cate_id}
            type={item.shortName}
          />
        );

      return (
        <Scroll
          pulldownRefresh={true}
          CalcHeight={computeRootHeight}
          key={index}
        >
          {Element}
        </Scroll>
      );
    });
  }
  return (
    <div className="HeaderTabsWrapper">
      <WhiteSpace />
      <Tabs
        tabs={dyNavList}
        initialPage={1}
        distanceToChangeTab={0.6}
        prerenderingSiblingsNumber={0}
        swipeable={false}
        onTabClick={(tab, index) => {
          document.title = tab["tag_name"];
        }}
        renderTab={(tab) => <p>{tab.tag_name}</p>}
      >
        {renderTabsContent()}
      </Tabs>
      <WhiteSpace />
    </div>
  );
}
export default DyTabs;
