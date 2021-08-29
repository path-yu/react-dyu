import ButtonAppBar from "@/components/base/ButtonAppBar/ButtonAppBar";
import Scroll from "@/components/base/scroll/scroll";
import LiveRoomList from "@/components/dypage/LiveRoomList";
import { getDOMSize, getWindowSize, urlSearchParse } from "@/utils";
import React, { useCallback, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
export default function LiveRoomListPage() {
  const history = useHistory();
  const liveRoomRef = useRef(null);
  const { cate_name, shortName } = urlSearchParse(history.location.search);
  
  const getNextPageData = useCallback(() => {
    return liveRoomRef.current[shortName].getNextLiveListData;
  }, [liveRoomRef]);


  function computedHeight() {
    let appBarHeight = getDOMSize(".ButtonAppBar")[1];
    return getWindowSize()[1] - appBarHeight + "px";
  }

  return (
    <div>
      <ButtonAppBar title={cate_name}/>
      <Scroll
        pullUpLoad={true}
        getNextPageData={getNextPageData}
        CalcHeight={computedHeight}
      >
        <LiveRoomList ref={liveRoomRef} type={shortName}/>
      </Scroll>
    </div>
  );
}
