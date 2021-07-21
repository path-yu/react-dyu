import { Icon } from "antd-mobile";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
export default function BookNavBar(props) {
  const { isNeedBack=true, onChange, onSearch, placeHolder='搜索' } = props;

  const history = useHistory();
  const [val, setVal] = useState("");

  const toBookSearchPage = () => history.push("/booksearch");
  const toBack = () => history.goBack();

  function handleChange(e) {
    setVal(e.target.value);
    onChange && onChange(e.target.value);
  }
  function search() {
    if (!val) {
      console.log("请不要输入空值");
    }
    onSearch && onSearch(val);
  }

  return (
    <div className="BookNavBar">
      {isNeedBack ? (
        <div className="searchBack" onClick={toBack}>
          <Icon type="left" size="small"></Icon>返回{" "}
        </div>
      ) : (
        ""
      )}
      <div
        className="bookSearch"
        onClick={toBookSearchPage}
      >
        {isNeedBack ? "" : <Icon type="search" size="xxs"></Icon>}
        <span>
          {placeHolder ? (
            <input
              type="text"
              value={val}
              placeholder="灵异"
              onChange={handleChange}
            />
          ) : (
            "搜索"
          )}
        </span>
      </div>
      <div className="bookSearchBtn" onClick={search}>
        搜索
      </div>
    </div>
  );
}
