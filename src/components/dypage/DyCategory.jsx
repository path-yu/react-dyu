import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useEmpty from "../../common/useEmpty";
import useLoading from "../../common/useLoading";
import http from "../../http";
import Empty from "../base/empty/empty";
function DyCategory(props) {
  const [categoryList, setCategoryList] = useState([]);
  const {image,description,handleError} = useEmpty();
  const ref = useRef(null);
  const {push} = useHistory();

  let { render, setLoading, loading } = useLoading(
    true,
    result,
    {},
    getCategoryData
  );

  useEffect(() => {
    getCategoryData();
    return () => {
      console.log('clearEffect');
    }
  },[loading]);
  
  async function getCategoryData() {
    http("/getColumnList").then(res => {
       setLoading(false);
       if (!categoryList.length) {
         setCategoryList(res.data);
       }
    }).catch(err => {
       setLoading(false);
      handleError(err);
    })
   
  }

  function toLiveRoomList(name, id) {
    push(`/liveRoomList?cate_name=${name}&cate_id=${id}`);
  }

  function result() {
    return (
      <div className="categoryWrap">
        {categoryList.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => toLiveRoomList(item.cate_name, item.cate_id)}
            >
              <img src={item.pic} alt="" />
              <span>{item.cate2Name} </span>
            </div>
          );
        })}
      </div>
    );
  }
  return !loading && !categoryList.length ? (
    <Empty  image={image} description={description}></Empty>
  ) : (
    render()
  );
}

export default DyCategory;