export function arrayToRouter(array) {
  const nodes = []
  // 获取顶级节点
  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    // 这个exists方法就是判断下有没有子级
    if (!exists(array, row.sub_router)) {
      nodes.push({
        path: row.path, // 路由地址
        hidden: row.hidden, // 全部携程true就行，如果后端没配
        component: require('@/layout/index').default, // 子组件的路由出口
        name: row.name, // 路由名称
        meta: { title: row.title, icon: row.icon }, // title就是显示的名字
        id: row.router_id, // 路由的id
        redirect: row.redirect // 重定向
        // children: [] // 子级
      })
    }
  }
  const toDo = Array.from(nodes)
  while (toDo.length) {
    const node = toDo.shift()
    // 获取子节点
    for (let i = 0; i < array.length; i++) {
      const row = array[i]
      // sub_router等于哪个父级的id，就push到哪个
      if (row.sub_router === node.id) {
        const child = {
          path: row.path,
          name: row.name,
          hidden: row.hidden,
          // 核心代码，因为二级路由的component是需要匹配页面的
          component: () =>
            require('@/views/' + row.component + '/index').default,
          meta: { title: row.title, icon: row.icon },
          id: row.router_id
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
function exists(rows, subRouter) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].router_id === subRouter) return true
  }
  return false
}
