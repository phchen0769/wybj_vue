// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 1、导入所有的svg图标
import SvgIcon from '@/components/SvgIcon'
const svgRequire = require.context('./svg', false, /\.svg$/) // 参数说明：目录，是否遍历子级目录，匹配文件的正则表达式
// 此时返回一个Require函数，这个函数可以接收一个Require参数，这个参数是一个函数，这个函数会返回一个模块，可用于Require的导入
// 该函数提供三个属性：resolve, keys, id，可以通过svgRequire.keys()获取所有的svg文件路径
// 遍历图标，把图标作为Request参数传入，svgRequire导入函数中，完成本地svg图标的全局注册
// console.log(svgRequire.keys()) //浏览器中打印所有key
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

// 2、完成SvgIcon的全局注册
export default app => {
  app.component('svg-icon', SvgIcon)
}
