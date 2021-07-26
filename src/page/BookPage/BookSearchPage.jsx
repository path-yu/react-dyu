import Scroll from "@/components/base/scroll/scroll";
import BookList from "@/components/bookPage/BookList";
import BookNavBar from "@/components/bookPage/BookNavBar";
import SearchHistoryList from "@/components/SearchHistoryList/SearchHistoryList";
import appState, { addSearchHistory } from "@/store";
import { Toast } from "antd-mobile";
import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
function BookSearchPage(props) {
  const ref = useRef(null);
  const BookNavBarRef = useRef(null)
  const history = useHistory();
  const [isShowSearchHistory, setIsShowSearchHistory] = useState(true);
  const [isShowBookList, setIsShowBookList] = useState(false);
  function handleChange(val) {
    console.log(val);
  }
  function handleSearch(val) {
    BookNavBarRef.current.changeValue(val);
    if (!val) {
      Toast.fail("请不要输入空值", 200);
      return;
    }
    
    setIsShowBookList(true);
    setIsShowSearchHistory(false);
    addSearchHistory(val);

     ref.current !== null && ref.current[1].getBookListData(val);
  }
  function handleOnBackTap() {
    if (isShowSearchHistory && !isShowBookList) {
      return history.goBack();
    }
    BookNavBarRef.current.changeValue('');
    if (isShowBookList) {
      setIsShowBookList(false);
      setIsShowSearchHistory(true);
    }
  }
  return (
    <div>
      <BookNavBar
        placeHolder="请输入书名,作者"
        isNeedBack={true}
        onChange={handleChange}
        onSearch={handleSearch}
        onBack={handleOnBackTap}
        ref={BookNavBarRef}
      />
      {/* 搜索历史 */}
      <SearchHistoryList
        handleSearch={handleSearch}
        appState={appState}
        isShowSearchHistory={isShowSearchHistory}
      ></SearchHistoryList>
      <Scroll>
        <BookList isShowBookList={isShowBookList} ref={ref}></BookList>
      </Scroll>
    </div>
  );
}
export default observer(BookSearchPage);
