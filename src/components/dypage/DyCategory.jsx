import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useEmpty from "../../common/useEmpty";
import useLoading from "../../common/useLoading";
import http from "../../http";
import { mapRender } from "../../utils";
import Empty from "../base/empty/empty";
import Scroll from "../base/scroll/scroll";

function DyCategory(props) {
  const [categoryList, setCategoryList] = useState([]);
  const { image, description, handleError } = useEmpty();
  const ref = useRef(null);
  const { push } = useHistory();

  let { RenderElement, setLoading, loading } = useLoading(
    true,
    result,
    {},
  );

  useEffect(() => {
    getCategoryData();
  }, []);
  async function getCategoryData() {
    http("/getColumnList")
      .then((res) => {
        setLoading(false);
        if (!categoryList.length) {
          setCategoryList(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        handleError(err);
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
      <Scroll direction='x' options={{scrollX:true}}>
        <div className="categoryWrap">
          {mapRender(categoryList, categoryItem)}
        </div>
      </Scroll>
    );
  }
  return !loading && !categoryList.length ? (
    <Empty image={image} description={description}></Empty>
  ) : (
   <RenderElement />
  );
}

export default DyCategory;
