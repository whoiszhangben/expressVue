export const addWindowResizeHandler = function (handler) {
    let oldHandler = window.onresize
    if (typeof window.onresize != 'function') {
      window.onresize = handler
    } else {
      window.onresize = function () {
        oldHandler()
        handler()
      }
    }
  }

  export const deepClone = function (origin) {
    if (origin === undefined) {
      return undefined
    }
  
    return JSON.parse(JSON.stringify(origin))
  }

  export const generateId = function() {
    return Math.floor(Math.random() * 100000 + Math.random() * 20000 + Math.random() * 5000);
  };

export const overwriteObj = function(obj1, obj2) {  /* 浅拷贝对象属性，obj2覆盖obj1 */
    Object.keys(obj2).forEach(prop => {
        obj1[prop] = obj2[prop]
    })
}

export function getQueryParam(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&")
    for (let i=0; i<vars.length; i++) {
      let pair = vars[i].split("=")
      if(pair[0] == variable) {
        return pair[1]
      }
    }
  
    return undefined;
  }

  export function isNull(value) {
    return (value === null) || (value === undefined);
  }

  export const insertCustomCssToHead = function (cssCode) {
    let head = document.getElementsByTagName('head')[0]
    let oldStyle = document.getElementById('vform-custom-css')
    if (oldStyle) {
      head.removeChild(oldStyle)  //应该先清除后插入！！
    }
  
    let newStyle = document.createElement('style')
    newStyle.type = 'text/css'
    newStyle.rel = 'stylesheet'
    newStyle.id = 'vform-custom-css'
    try {
      newStyle.appendChild(document.createTextNode(cssCode))
    } catch(ex) {
      newStyle.styleSheet.cssText = cssCode
    }
  
    head.appendChild(newStyle)
  }
  
  export const insertGlobalFunctionsToHtml = function (functionsCode) {
    let bodyEle = document.getElementsByTagName('body')[0]
    let oldScriptEle = document.getElementById('v_form_global_functions')
    !!oldScriptEle && bodyEle.removeChild(oldScriptEle)
  
    let newScriptEle = document.createElement('script')
    newScriptEle.id = 'v_form_global_functions'
    newScriptEle.type = 'text/javascript'
    newScriptEle.innerHTML = functionsCode
    bodyEle.appendChild(newScriptEle)
  }

  export function isEmptyStr(str) {
    //return (str === undefined) || (!str) || (!/[^\s]/.test(str));
    return (str === undefined) || (!str && (str !== 0) && (str !== '0')) || (!/[^\s]/.test(str));
  }



