import React from "react";
import moment from "moment";
import "./LimitData.css";
const LimitData = ({ limit }) => {
  // 期限日との残り時間を計算
  const now = moment.utc();
  const deadline = limit.diff(now, "minutes");
  console.log(now);
  console.log(limit);
  let deadlineText = "";
  if (deadline < 0) {
    deadlineText = "期限切れ";
  } else {
    const days = Math.floor(deadline / (24 * 60));
    const hours = Math.floor((deadline % (24 * 60)) / 60);
    const minutes = deadline % 60;
    deadlineText = `残り ${days}日 ${hours}時間 ${minutes}分`;
  }

  return (
    <div className="limit-data-card">
      <div className="limit-data">
        {limit._d == "Invalid Date"
          ? "期限が設定されていません。"
          : limit.format("YYYY年M月D日H時m分")}
      </div>
      <div
        style={{ color: deadline <= 1 ? "red" : "black" }}
        className="deadline"
      >
        {deadlineText}
      </div>
    </div>
  );
};

export default LimitData;
