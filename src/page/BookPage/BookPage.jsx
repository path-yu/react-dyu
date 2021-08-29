import Scroll from "@/components/base/scroll/scroll";
import BookList from "@/components/bookPage/bookList";
import BookNavBar from "@/components/bookPage/BookNavBar";
import ScrollableTabsButtonAuto from "@/components/ScrollableTabsButtonAuto/ScrollableTabsButtonAuto";
import bookCateList from "@/data/bookcategort.json";
import { getDOMSize, getWindowSize } from "@/utils";
import React, { useCallback, useEffect, useRef } from "react";
import "./bookPage.scss";
export default function BookPage() {
  const BookListRef = useRef(null);
  const id = useRef(bookCateList.list[0].id);

  useEffect(() => {});

  const getNextPageData = useCallback(() => {
    return BookListRef.current[id.current].getNextPageData;
  }, [BookListRef]);

    // 计算scroll 组件根wrapper的高度, 好达到滚动的高度
    function computeRootHeight(calcHeight) {
      const headerTopHeight = getDOMSize(".BookNavBar")[1];
      const tabsHeight = getDOMSize(".tabsWrapper")[1];
      const res = getWindowSize()[1] - tabsHeight - headerTopHeight - 56;
      return res + "px";
    };

  function onChange(index) {
    id.current = bookCateList.list[index].id;
  }
  const renderItem = (item) => {
    return (
      <Scroll
        CalcHeight={computeRootHeight}
        key={item.cate_id}
        pullUpLoad={true}
        getNextPageData={getNextPageData}
      >
        <BookList ref={BookListRef} name={item.name} id={item.id}/>;
      </Scroll>
    );
  };
  return (
    <div>
      <BookNavBar/>
      <ScrollableTabsButtonAuto
        renderTabsContent={renderItem}
        tabs={bookCateList.list}
        keyName={'name'}
        onChange={onChange}
      />
    </div>
  );
}
