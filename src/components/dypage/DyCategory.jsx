import http from '@/http';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import useEmpty from '../../common/useEmpty';
import useLoading from '../../common/useLoading';
import { mapRender, shuffle } from '../../utils';
import Scroll from '../base/scroll/scroll';
function DyCategory(props, ref) {
  const [categoryList, setCategoryList] = useState([]);
  const { image, description, handleError } = useEmpty();
  const history = useHistory();

  let { RenderElement, setLoading, setIsError, setEmpty, loading } = useLoading(
    true,
    result,
    {}
  );
  useEffect(() => {
    getCategoryData();
  }, []);
  useImperativeHandle(ref, () => {
    return {
      getCategoryData,
    };
  });
  async function getCategoryData() {
    setIsError(false);
    setLoading(true);
    return http('/getColumnList')
      .then((res) => {
        setLoading(false);
        if (!res.data.length) {
          return setEmpty(true);
        }
        setCategoryList(shuffle(res.data));
      })
      .catch((err) => {
        setLoading(false);
        setIsError(true);
      });
  }

  function toLiveRoomList(params) {
    history.push(
      `/liveRoomList?cate_name=${params.cate2Name}&shortName=${params.shortName}`,
      { isOpenNewPage: true }
    );
  }
  const categoryItem = (item, index) => {
    return (
      <div key={index} onClick={() => toLiveRoomList(item)}>
        <img src={item.pic} alt='' />
        <span>{item.cate2Name} </span>
      </div>
    );
  };

  function result() {
    return (
      <Scroll direction='x' options={{ scrollX: true }}>
        <div className='categoryWrap'>
          {mapRender(categoryList, categoryItem)}
        </div>
      </Scroll>
    );
  }
  return <RenderElement />;
}

export default forwardRef(DyCategory);
