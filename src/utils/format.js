export function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}

//格式化金额的输入
export function formatPrice(p) {
  if (!p) {
    return "0";
  } else {
    p += "";
    //去除非数字，只保留数字和.
    p = p.replace(/[^\d.]/g, "");

    //必须保证第一个为数字而不是.
    p = p.replace(/^\./g, "0.");

    //保留2位小数
    p = p.replace(/^(\d+)\.(\d{2}).*$/, "$1.$2");

    return parseFloat(p);
  }
}


export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
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
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}


function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}