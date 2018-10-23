export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) { /* 用正则表达式匹配fmt字符串中的yyyy ，之后把它替换成真正的年份 */
    /* RegExp.$1就是匹配到的yyyy，替换成年 + ''转换成字符串  */
    /* substr截取字符串，substr（0）,从序号为0，开始截取。substr（2,3），从序号2开始截取3个长度
       如果RegExp.$1.length==4，就截取4位年数，比如截取到2018
       如果RegExp.$1.length==2 ，那就截取2018的18 */
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) { // 动态构造正则表达式
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
