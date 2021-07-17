import PropTypes from 'prop-types';
import React from 'react';
export default function Image() {
    return (
        <div>
            
        </div>
    )
}
const types = PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]);
Image.propTypes = {
  src: PropTypes.string,
  fit:PropTypes.string,
  alt:PropTypes.string,
  width:types,
  height:types,
  radius:types,
  round:PropTypes.bool,
  showError:PropTypes.bool,
  showLoading:PropTypes.bool,
  errorIcon:PropTypes.string,
  loadingIcon:PropTypes.string
};