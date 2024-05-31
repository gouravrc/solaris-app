import React, { useState } from "react";
import "./index.css";

const Slider = ({ active }) => {
  const [label, setLabel] = useState(1);

  return (
    <div className="slider-container">
      <div
        onClick={() => {
          setLabel(1);
          active("login")
        }}
        className="slider-div"
      >
        <label className="label-normal" style={{ cursor: "pointer" }}>Login</label>
        {label === 1 && (
          <div className="slider-float">
            <label className="label-active" style={{ cursor: "pointer" }}>Login</label>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          setLabel(2);
          active("signup")
        }}
        className="slider-div"
      >
        <label className="label-normal" style={{ cursor: "pointer" }}>Signup</label>
        {label === 2 && (
          <div className="slider-float">
            <label className="label-active">Signup</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
