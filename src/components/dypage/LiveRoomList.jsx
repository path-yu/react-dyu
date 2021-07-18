import useLoading from "@/common/useLoading";
import { shuffle } from "@/utils";
import Image from 'material-ui-image';
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
  const [fresh,setFresh] = useState(false);
  let { RenderElement, setLoading, setEmpty, setIsError,loading } = useLoading(
    true,
    RenderRoomList,
    { isCenter: true },
    props
  );
  const { push } = useHistory();
  useEffect(() => {
    if (!RoomList.length) {
      getLiveListData();
    }
    return () => {
    };
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      getData: getLiveListData,
    }),
    []
  );
  function getLiveListData(arg) {
   const typeArg = arg ? arg.shortName : type;
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
            <div className='liveRoomItem' key={item.rid + index} onClick={toLiveRoom}>
              {/* <img src={item.roomSrc} alt="" /> */}
              <Image style={{height:'100px',padding:0}} src={item.roomSrc} imageStyle={{width:'100%',height:'100px'}} />
              <span className="onlineCount">{item.hn}</span>
              <p className="nickName">
                <i className="NormalRoomItem-showAnchorIcon"></i>
                <span>{item.nickname}</span>
              </p>
              <div className="roomName">
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
