export function arrayToMenu(array) {
  const nodes = []
  // 获取顶级节点
  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    // 这个exists方法就是判断下有没有子级
    if (!exists(array, row.parentId)) {
      nodes.push({
        path: row.path, // 路由地址
        hidden: row.hidden, // 全部携程true就行，如果后端没配
        component: row.component, // 一般就是匹配你文件的component
        name: row.name, // 路由名称
        meta: { title: row.title, icon: row.icon }, // title就是显示的名字
        id: row.id, // 路由的id
        redirect: 'noredirect'
      })
    }
  }
  const toDo = Array.from(nodes)
  while (toDo.length) {
    const node = toDo.shift()
    // 获取子节点
    for (let i = 0; i < array.length; i++) {
      const row = array[i]
      // parentId等于哪个父级的id，就push到哪个
      if (row.parentId === node.id) {
        const child = {
          path: row.path,
          name: row.name,
          hidden: row.hidden,
          // 核心代码，因为二级路由的component是需要匹配页面的
          component: require('@/views/' + row.component + '/index.vue'),
          meta: { title: row.title, icon: row.name },
          id: row.id
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
function exists(rows, parentId) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id === parentId) return true
  }
  return false
}
