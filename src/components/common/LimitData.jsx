import React from 'react'
import moment from "moment";
import './LimitData.css';
const LimitData = ({limit}) => {
  // 期限日との残り時間を計算
  const now = moment();
  const deadline = limit.diff(now,'days');
  const checkDeadlineDate = limit.diff(now,'hours');

  // 残り時間によって出力内容を変える。NaNの場合は空文字なので問題ない。
  let deadlineText = '';
  if (checkDeadlineDate < 0) {
    deadlineText = '期限切れ';
  }
  else if (checkDeadlineDate <=  24 ){
    deadlineText = '本日中';
  }
  else if (checkDeadlineDate > 24){
    deadlineText = `残り ${deadline}日`;
  }

  return (
    <div className='limit-data-card'>
      <div className='limit-data'>{limit._d == 'Invalid Date' ? '期限が設定されていません。' : limit.format("YYYY年M月D日H時m分") }</div>
      <div
        style={{ color : deadline <= 1 ? 'red' : 'black' }}
        className='deadline'
      >{deadlineText}</div>
    </div>
  )
}

export default LimitData
