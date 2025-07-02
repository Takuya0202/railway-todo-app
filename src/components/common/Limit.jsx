import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css"; // css インポート
import './Limit.css';

const Limit = ({ limit, setLimit, setIsLimitChange , ...props }) => {
  return (
    <div className="limit-card">
      <Datetime
        value={limit}
        inputProps={{
          // inputPropsで渡さないとスタイル適用できない
          style: {
            padding: "6px",
            border: "solid 2px #329eff",
            borderRadius: "4px",
          },
        }}
        onChange={(e) => {
          setLimit(e); // limitはeだけでよい
          setIsLimitChange(true);
        }}
        dateFormat="YYYY-MM-DD"
        timeFormat="HH:mm:ss"
        {...props}
      />
    </div>
  );
};

export default Limit;
