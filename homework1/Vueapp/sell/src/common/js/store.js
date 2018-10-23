/* 数据的存取，存取到本地localStorage */
/*
* id为url参数，key是需要存储数据的键名，val为存储的值
* 存储数据
* localStorage只能存取字符串
* */
export function saveToLocal(id, key, value) {
  // 定义商家数据为__seller__
  let seller = window.localStorage.__seller__;
  if (!seller) { // 如果是第一次存，没有seller
    seller = {};
    seller[id] = {};
    seller[id][key] = value;
  } else { // 如果不是第一次存，有seller
    // 先把seller转换成json对象
    seller = JSON.parse(seller); // parse 用于从一个字符串中解析出 JSON 对象
    if (!seller[id]) { // 判断是否有当前的商家，有可能是a商家，也有可能保存b商家
      seller[id] = {};
    }
    seller[id][key] = value;
  }
  // seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller); // stringify用于从一个对象解析出字符串
};

/*
*读取localStorage数据
*def为默认读取数据
* */
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__; // 首先读取__seller__
  if (!seller) { /* 如果没有就返回默认值 */
    return def;
  }
  seller = JSON.parse(seller)[id]; /* 如果有就转换成JSON对象，然后取商家下面的所有对象 */
  if (!seller) { /* 如果取不到商家下面的所有对象 */
    return def; /* 就返回默认值 */
  }
  let ret = seller[key]; /* 如果取到了，就看商家下面有没有这个key */
  return ret || def; /* 如果没有key，就返回默认值，如果有，就把值取出来 */
};
