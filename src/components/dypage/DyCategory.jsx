import http from '@/http';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useEmpty from "../../common/useEmpty";
import useLoading from "../../common/useLoading";
import { mapRender } from "../../utils";
import Scroll from "../base/scroll/scroll";
function DyCategory(props) {
  const [categoryList, setCategoryList] = useState([]);
  const { image, description, handleError } = useEmpty();
  const { push } = useHistory();

  let { RenderElement, setLoading, setIsError, setEmpty,loading } = useLoading(
    true,
    result,
    {}
  );
  useEffect(() => {
    getCategoryData();
  }, []);
  async function getCategoryData() {
    return http("/getColumnList")
      .then((res) => {
        setLoading(false);
        if(!res.data.length){
          return setEmpty(true);
        }
        if (!categoryList.length) {
          setCategoryList(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        setIsError(err);
      });
  }

  function toLiveRoomList(name, id) {
    push(`/liveRoomList?cate_name=${name}&cate_id=${id}`);
  }
  const categoryItem = (item, index) => {
    return (
      <div
        key={index}
        onClick={() => toLiveRoomList(item.cate_name, item.cate_id)}
      >
        <img src={item.pic} alt="" />
        <span>{item.cate2Name} </span>
      </div>
    );
  };

  function result() {
    return (
      <Scroll  direction="x" options={{ scrollX: true }}>
        <div className="categoryWrap">
          {mapRender(categoryList, categoryItem)}
        </div>
      </Scroll>
    );
  }
  return <RenderElement />;
}

export default DyCategory;
