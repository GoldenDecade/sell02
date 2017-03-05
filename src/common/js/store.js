export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__//相当于setItem
  if(!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if(!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}


export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__
  if(!seller) {
    return def
  }
  seller = JSON.parse(seller)
  if(!seller[id]) {
    return def
  }
  //代码就是这样优化的
  /*if(!seller[id][key]) {
    return def
  }else {
    return seller[id][key]
  }*/
  return seller[id][key] || def

}