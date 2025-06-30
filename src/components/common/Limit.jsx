import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css"; // css インポート

const Limit = ({ limit, setLimit, ...props }) => {
  return (
    <div>
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
        onChange={(e) => setLimit(e)}
        dateFormat="YYYY-MM-DD"
        timeFormat="HH:mm:ss"
        {...props}
      />
    </div>
  );
};

export default Limit;
