/**
 * Created by Administrator on 2017/2/26/026.
 */

/**
 * 解析统一资源定位器url参数
 * @example ?id=12345&a=b
 * @return Object {id:123, a:b}
 */
export function urlParse() {
    let url = window.location.search
    let obj = {}
    let reg = /[?&][^?&]+=[^?&]+/g
    let arr = url.match(reg)  // ['?id=12345', '&a=b']
    if(arr) {
        arr.forEach(function(elem, index) {
            let tempArr = elem.slice(1).split('=')
            let key = decodeURI(tempArr[0])
            let val = decodeURI(tempArr[1])
            obj[key] = val
        })
    }
  return obj
}
