import BookNavBar from '@/components/bookPage/BookNavBar';
import React from 'react';

export default function BookSearchPage() {
    function handleChange(val){
        console.log(val);
    }
    function handleSearch(val) {
      console.log("43",val);
    }
    return (
      <div>
        <BookNavBar
          placeHolder="请输入书名,作者"
          isNeedBack={true}
          onChange={handleChange}
          onSearch={handleSearch}
        />
      </div>
    );
}
