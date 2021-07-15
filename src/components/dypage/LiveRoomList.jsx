import useLoading from "@/common/useLoading";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../../http";


function LiveRoomList(props) {
  const type = props.type;
  const [LiveRoomList, setLiveRoomList] = useState([]);
  const [page, setPage] = useState(1);
  let { RenderElement, setLoading, loading } = useLoading(
    true,
    RenderRoomList,
    {}
  );
  const { push } = useHistory();

  useEffect(() => {
      console.log('live');
    if (!LiveRoomList.length) {
      getLiveListData();
    }
  },[]);
  function getLiveListData() {
    http("/liveRoomList", {
      params: {
        type,
        page,
      },
    }).then((res) => {
      setLoading(false);
      setLiveRoomList(res.data.list);
    });
  }
  const toLiveRoom = () => push("/liveroom");

  function RenderRoomList (){
    return (
      <div className="LiveRoomList">
        {LiveRoomList.map((item, index) => {
          return (
            <div key={index} onClick={toLiveRoom}>
              <img src={item.roomSrc} alt="" />
              <span className="onlineCount">{item.hn}</span>
              <p className="nickName">
                <i className="NormalRoomItem-showAnchorIcon"></i>
                <span>{item.nickname}</span>
              </p>
              <div>
                <p> {item.roomName} </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return <RenderElement></RenderElement>;
}
export default LiveRoomList