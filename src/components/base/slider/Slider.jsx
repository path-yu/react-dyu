
import propTypes from 'prop-types';
import React, { useRef } from 'react';
import { mapRender } from '../../../utils';
import './slider.scss';
import useSlider from "./use_slider";
 function Slider(props) {
  const rootRef = useRef(null);
  const { currentPageIndex, slider,computedClassName } = useSlider(rootRef);

  const { sliders } = props;
  const renderItemImg = (item,index) => {
    return (
      <div key={index} className="slider-page" >
        <a>
          <img src={item} />
        </a>
      </div>
    );
  }
  const renderDotItem = (item,index) => {
    return <span key={index} className={computedClassName(index)}></span>;
  }
  return (
    <div className="slider" ref={rootRef}>
      <div className="slider-group">{mapRender(sliders, renderItemImg)}</div>
      <div className="dots-wrapper">{mapRender(sliders, renderDotItem)}</div>
    </div>
  );
}
Slider.propsTypes = {
  sliders:propTypes.array
}
export default Slider