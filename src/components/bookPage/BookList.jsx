import useLoading from "@/common/useLoading";
import http from "@/http";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { useHistory } from "react-router-dom";
function BookList(props, ref) {
  const id = props.id || '1';
  const { isShowBookList = true } = props;
  const limit = 20;
  const page = useRef(1);
  const maxPage = useRef(2);

  const [bookListData, setBookListData] = useState([]);
  const history = useHistory();
  let { RenderElement, setLoading, setEmpty, setIsError } = useLoading(
    true,
    RenderBookList,
    { isCenter: true },
    props
  );
  useEffect(() => {
    if (!bookListData.length && isShowBookList === true) {
      getBookListData();
    }
  }, []);
  useImperativeHandle(
    ref,
    () => {
      const res = {};
      // 利用type来标记每个组件实例方法
      res[id] = {
        getNextPageData,
        props,
        getBookListData,
      };
      return Object.assign(res, ref.current);
    },
    []
  );
  function getBookListData(keyword) {
    console.log(keyword);
    return http("/book/searchByPage", {
      params: {
        catId: id,
        curr: page.current,
        sort: "last_index_update_time",
        limit,
        keyword,
      },
    })
      .then(
        (res) => {
          setLoading(false);
          const list = res.data.data.list;
          if (!list.length) {
            return setEmpty(true);
          }
          setEmpty(false);
          setBookListData(list);
        },
        (err) => {
          setIsError(true);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }
  function getNextPageData() {
    if (page.current >= maxPage.current) return Promise.resolve(true);
    return http("/book/searchByPage", {
      params: {
        catId: id,
        curr: page.current + 1,
        limit,
        sort: "last_index_update_time",
      },
    })
      .then(
        (res) => {
          const listData = res.data.data.list;
          // 返回true 表示数据为空
          if (!listData.length) {
            return true;
          }
          page.current = page.current + 1;
          setBookListData((list) => list.concat(listData));
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

  const toBookDetailPage = (params) => {
    history.push({
      pathname: "/bookDetail/" + params.id,
      isOpenNewPage:true,
      state:params
    });
  };
  function RenderBookList() {
    return (
      <div className="BookList">
        {bookListData.map((item, index) => {
          return (
            <div key={index} onClick={() => toBookDetailPage(item)}>
              <div className="picLeft">
                <img src={item.picUrl} alt="" />
              </div>
              <div className="bookInfo">
                <h5>{item.bookName}</h5>
                <p>作者:{item.authorName} </p>
                <p>更新:{item.lastIndexUpdateTime} </p>
                <p>类别:{item.catName} </p>
                <p>状态: {item.bookStatus == "0" ? "连载" : "完结"} </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return isShowBookList ?  <RenderElement />  : <div></div>
}

export default forwardRef(BookList);
