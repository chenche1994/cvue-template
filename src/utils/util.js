export const clearEmptySearch = (params) => {
  const obj = {}
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (typeof value === 'string') {
      if (value) {
        obj[key] = value
      }
    } else if (Array.isArray(value)) {
      if (value.length) {
        obj[key] = value
      }
    } else if (value !== null){
      obj[key] = value
    }
  })
  return obj
}
/**
 * 数组转树
 * @param {Array} list
 * @param {string} pid
 * @param {string} id
 */
export function arrayToTree(list = [], pid = 'parentId', id = 'id') {
  const data = JSON.parse(JSON.stringify(list))
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item[id]] = item
  })
  data.forEach(item => {
    const parent = map[item[pid]]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
   * 树转数组
   * @param {Array} list
   * @param {String} children
   * @param {String} id
   */
export function treeToArray(list = [], children = 'children') {
  const stack = JSON.parse(JSON.stringify(list))
  const data = []
  while (stack.length !== 0) {
    const pop = stack.pop()
    const popChildren = pop[children]
    delete pop[children]
    data.push(pop)
    if (popChildren) {
      for (let i = popChildren.length - 1; i >= 0; i--) {
        stack.push(popChildren[i])
      }
    }
  }
  return data
}
