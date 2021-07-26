import { makeStyles } from "@material-ui/core";
import { ArrowBackIos, Search } from "@material-ui/icons";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useHistory } from "react-router-dom";
const useStyle = makeStyles({
  root:{
    fontSize:'0.47222222rem'
  }
})
function BookNavBar(props,ref) {
  const classes = useStyle();
  const { isNeedBack = false, onChange, onSearch, placeHolder = "搜索",onBack } = props;

  const history = useHistory();
  const [val, setVal] = useState("");

  const toBookSearchPage = () => {
    if(!isNeedBack){
       history.push({
         pathname: "booksearch",
         isOpenNewPage: true,
       });
    }
   
  };
  const toBack = () => {
    // 如果父组件传递了对应的事件处理函数, 则调用父组件的处理函数
    if (onBack) {
      return onBack();
    }
    history.goBack();
  }

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
  function changeValue(value){
    setVal(value);
  }
  useImperativeHandle(ref,() => {
    return {
      changeValue
    }
  })
  return (
    <div className="BookNavBar">
      {isNeedBack ? (
        <div className="searchBack" onClick={toBack}>
          <ArrowBackIos className={classes.root}></ArrowBackIos>返回{" "}
        </div>
      ) : (
        ""
      )}
      <div className="bookSearch" onClick={toBookSearchPage}>
        {isNeedBack ? "" : <Search className={classes.root}></Search>}
        <span>
          {placeHolder ? (
            <input
              type="text"
              value={val}
              disabled={isNeedBack ? false : true}
              placeholder={placeHolder}
              onChange={handleChange}
              style={{ outline: "none" }}
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
export default forwardRef(BookNavBar);