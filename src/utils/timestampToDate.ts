export default function (timestamp: number) {
  if (typeof timestamp != 'number') timestamp = Number(timestamp)
  const date = new Date(timestamp); // 根据时间戳创建Date对象
  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份，需要加1
  const day = date.getDate(); // 获取日期
  const hour = date.getHours(); // 获取小时
  const minute = date.getMinutes(); // 获取分钟
  const second = date.getSeconds(); // 获取秒数

  const getYear = () => year
  const getMonth = () => month
  const getDay = () => day
  const getHour = () => hour
  const getMinutes = () => minute
  const getSecond = () => second
  const getDate = () => `${year}-${month}-${day}`
  const getLocalDate = () => `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
  const getFullDate = () => `${getDate()} ${hour}:${minute}:${second}`
  const getFullLocalDate = () => `${getLocalDate()} ${hour > 9 ? hour : '0' + hour}:${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`

  return {
    getYear,
    getMonth,
    getDay,
    getHour,
    getMinutes,
    getSecond,
    getDate,
    getLocalDate,
    getFullDate,
    getFullLocalDate,
  }

}