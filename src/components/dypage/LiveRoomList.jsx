import useLoading from "@/common/useLoading";
import { shuffle } from "@/utils";
import Image from "material-ui-image";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { useHistory } from "react-router-dom";
import http from "../../http";
const age = 43;
function LiveRoomList(props, ref) {
  let type = props.type;
  const [RoomList, setRoomList] = useState([]);
  const page = useRef(1);
  const maxPage = useRef(null);
  let { RenderElement, setLoading, setEmpty, setIsError } = useLoading(
    true,
    RenderRoomList,
    { isCenter: true }
  );
  const { push } = useHistory();
  useEffect(() => {
    if (!RoomList.length) {
      getLiveListData();
    }
  }, []);
  useImperativeHandle(
    ref,
    () => {
      const res = {};
      // 利用type来标记每个组件实例方法
      res[type] = {
        getLiveListData,
        getNextLiveListData,
        props,
      };
      // 如果直接返回res, 当多次调用这个组件是,最后一次的总会覆盖掉前面的
      // 导致我们不能通过ref获取到每个组件实例的方法,
      //因此我们需要将先前的current和本次的对象合并
      return Object.assign(res, ref.current);
    },
    []
  );
  function getLiveListData(arg) {
    page.current = 1;
    return http("/liveRoomList", {
      params: {
        type: type === "tj" ? undefined : type,
        page: page.current,
      },
    })
      .then(
        (res) => {
          setLoading(false);
          if (!res.data.list.length) {
            return setEmpty(true);
          }
          maxPage.current = res.pageCount;
          setRoomList(shuffle(res.data.list));
        },
        (err) => {
          setIsError(true);
          setLoading(false);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }
  function getNextLiveListData() {
    if (page.current > maxPage.current) return Promise.resolve(true);
    return http("/liveRoomList", {
      params: {
        type: type !== "tj" ? type : "",
        page: page.current + 1,
      },
    })
      .then(
        (res) => {
          // 返回true 表示数据为空
          if (!res.data.list.length) {
            return true;
          }
          page.current = page.current + 1;

          setRoomList((list) => list.concat(res.data.list));
          return false;
        },
        (err) => {
          return err;
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }
  const toLiveRoom = (params) => {
    push(`/liveRoom?id=${params.cate2Id}&roomName=${params.roomName}`, {
      isOpenNewPage: true,
    });
  };
  function RenderRoomList() {
    return (
      <div className="LiveRoomList">
        {RoomList.map((item, index) => {
          return (
            <div
              className="liveRoomItem"
              key={item.rid + index}
              onClick={() => toLiveRoom(item)}
            >
              {/* <img src={item.roomSrc} alt="" /> */}
              <Image
                style={{ height: "115px", padding: 0 }}
                src={item.roomSrc}
                imageStyle={{ width: "100%", height: "115px" }}
              />
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
