/** 后端传入的路由表转换成router的格式
 * @param {Array} array
 * @returns {Array}
 */
export function arrayToMenu(array) {
  const nodes = []
  // 获取顶级节点
  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    // 这个exists方法就是判断下有没有子级
    if (!exists(array, row.sub_menu)) {
      nodes.push({
        path: row.path, // 路由地址
        hidden: row.hidden, // 是否隐藏
        component: row.component, // 一般就是匹配你文件的component
        name: row.name, // 路由名称
        meta: { title: row.title, icon: row.icon }, // title就是显示的名字
        id: row.menu_id, // 路由的id
        redirect: 'noRedirect',
        children: []
      })
    }
  }
  const toDo = Array.from(nodes)
  while (toDo.length) {
    const node = toDo.shift()
    // 获取子节点
    for (let i = 0; i < array.length; i++) {
      const row = array[i]
      // hidden不为true而且sub_menu等于哪个父级的id，就push到哪个
      if (row.hidden === false && row.sub_menu === node.id) {
        const child = {
          path: row.path,
          name: row.name,
          hidden: row.hidden,
          // 核心代码，因为二级路由的component是需要匹配页面的
          component: require('@/views/' + row.component + '/index.vue'),
          meta: { title: row.title, icon: row.name },
          id: row.menu_id
        }
        if (node.children) {
          node.children.push(child)
        } else {
          node.children = [child]
        }
        toDo.push(child)
      }
    }
  }
  return nodes
}
// 看下有没有子级
function exists(rows, subMenu) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].menu_id === subMenu) return true
  }
  return false
}
