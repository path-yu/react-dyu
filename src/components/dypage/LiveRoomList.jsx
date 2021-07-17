import useLoading from "@/common/useLoading";
import { shuffle } from "@/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle, useState
} from "react";
import { useHistory } from "react-router-dom";
import http from "../../http";
const age = 43;
function LiveRoomList(props, ref) {
  const type = props.type;
  LiveRoomList.type = type;
  const [RoomList, setRoomList] = useState([]);
  const [page, setPage] = useState(1);
  let { RenderElement, setLoading, setEmpty, setIsError,loading } = useLoading(
    true,
    RenderRoomList,
    { isCenter: true }
  );
  const { push } = useHistory();
  useEffect(() => {
    console.log("effect", props);
    if (!RoomList.length) {
      getLiveListData();
    }
    return () => {
      console.log("distort", props);
    };
  }, [props]);
  useImperativeHandle(
    ref,
    () => ({
      getLiveListData,
    }),
    [props]
  );
  console.log("render", props);
  function getLiveListData(arg) {
   const typeArg = arg ? arg.shortName : type;
    console.log("get", props);
    if(arg) return;
    return http("/liveRoomList", {
      params: {
        type:typeArg,
        page
      },
    })
      .then((res) => {
        setLoading(false);
        if (!res.data.list.length) {
          return setEmpty(true);
        }
        setRoomList([...shuffle(res.data.list)]);
      },err => {
        setIsError(true)
      }).catch(error =>{
        console.log(error);
      })
  }
  const toLiveRoom = () => push("/liveroom");
  function RenderRoomList() {
    return (
      <div className="LiveRoomList">
        {RoomList.map((item, index) => {
          return (
            <div key={item.rid+index} onClick={toLiveRoom}>
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
  }

  return <RenderElement></RenderElement>;
}
export default forwardRef(LiveRoomList);
