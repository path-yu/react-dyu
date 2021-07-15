
import React from 'react';
import './loading.scss';
const CircularIcon = (color) => {
  return (
    <div className="loading loading--circular">
      <span
        className="loading__spinner loading__spinner--circular"
        style={{ color: color }}
      >
        <svg viewBox="25 25 50 50" className="loading__circular">
          <circle style={{stroke:color}} cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
      </span>
    </div>
  );
} 

export default function Loading(props){
  const {
    color = "#c9c9c9",
    message = "加载中...",
    textColor = "#c9c9c9",
  } = props;

  return (
    <div className="loadingContainer">
      <CircularIcon color={color} />
      <p style={{ color: textColor }}>{message}</p>
    </div>
  );
}