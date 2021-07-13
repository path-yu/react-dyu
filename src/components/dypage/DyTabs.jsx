import { Tabs, WhiteSpace } from "antd-mobile";
import React, { useEffect, useState } from "react";
import http from "../../http";
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
       console.log(res.data);
        setDyNavList((state) => {
          return state.concat(res.data);
        });
     });
  }
  useEffect(() => {
    if(dyNavList.length === 2) {
      getNavListData();
    }
  });
  function renderTabsContent(){
   
    return dyNavList.map((item, index) => {
      if (item.tag_name === "推荐") {
        return (
          <Scroll key={index}>
            <DyHome></DyHome>;
          </Scroll>
        );
      } else {
        return (
          <LiveRoomList
            key={index}
            tagId={item.tag_id}
            api="subLiveList"
            cateId={item.cate_id}
            type={item.shortName}
          ></LiveRoomList>
        );
      }
    });
  }
   return (
     <div className="HeaderTabsWrapper">
       <WhiteSpace />
       <Tabs
         tabs={dyNavList}
         initialPage={1}
         distanceToChangeTab={0.6}
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
export default DyTabs