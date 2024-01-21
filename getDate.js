function getDate(dtstr) {
  // 获取日期
  const dt = new Date();
  Date(dtstr);
  // 年
  const y = dt.getFullYear();
  //月
  const m = padZero(dt.getMonth() + 1);
  //日
  const d = padZero(dt.getDate());
  // 时
  const hh = padZero(dt.getHours());
  //分
  const mm = padZero(dt.getMinutes());
  //秒
  const ss = padZero(dt.getSeconds());
  // 返回格式2023年09月14日 09时50分01秒
  return `${y}-${m}-${d}`;
}

function padZero(n) {
  return n > 9 ? n : "0" + n;
}
module.exports = { getDate };
