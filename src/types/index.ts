import type {  RouteRecord } from 'vue-router'


// 账户信息
export interface IUser {
  username: string          // 用户名
  password: string          // 密码
  checkPassword?: string    // 检查密码
}
// 侧边栏路由 
export interface IRouteMenu {
  title: string             // 标题
  path: string              // 路径
  fullpath?: string         // 完整路径
  icon: string              // 图标
  children?: IRouteMenu[]   // 子路由
}
// 订单信息
export interface IOrder {
  createTime?: string
  status?: '支付超时' | '待支付'
  userid?: string
  shopid?: string
  goodsList?: Array<IOrderGoods>
}
// 订单商品信息
export interface IOrderGoods {
  id?: IGoods['id']                           // 商品id
  title?: IGoods['title']                     // 商品名称
  size?: IGoods['size']                       // 商品分量
  packingCharges?: IGoods['packingCharges']   // 商品打包价格
  price?: number                              // 商品单个价格
  countPrice?: number                         // 商品总价格
  choice?: string                             // 商品
}
// 商品信息 
export interface IGoods {
  id?: number                           // 唯一标识符
  shopid?: number                       // 所属商家
  logo?: string                         // 商品图片
  myshow?: 1 | 0                        // 商品是否展示
  type?: string                         // 商品分类
  title?: string                        // 商品名称
  price?: number                        // 商品单个价格
  singleSell?: 1 | 0                    // 商品是否单个可售
  menuType?: string                     // 商品所属菜单列表
  size?: string                         // 商品分量
  isChoice?: 1 | 0                      // 商品是否可选规格
  choice?: string                       // 商品可选规格内容
  discount?: number                     // 商品折扣
  packingCharges?: number               // 商品打包费用
  goodsLogo?: IGoodsLogo                // 商品右上角 Logo
  pubdate?: string                      // 商品发布日期
}
// 菜单列表
export interface IMenu {
  id?: number
  shopid?: number
  name?: string
}
export type IGoodsLogo =  '无' | '招牌' | '新品'
// 店铺信息
export interface IShop {
  id?: number                 // 唯一标识
  myshow?: number             // 是否展示
  shopid?: number             // 商铺账号信息
  title?: string              // 商品名称
  address?: string            // 地址
  phone?: string              // 电话
  typemainid?: number         // 店铺主分类
  typeviceid?: number         // 店铺次分类
  preview?: string            // 标语
  info?: string               // 简介
  deliveryPrice?: number      // 配送费
  minPriceDelivery?: number   // 起始配送费
  startTime?: string          // 起始营业时间
  endTime?: string            // 结束营业时间
  logo?: string               // 店铺头像
  background?: string         // 店铺背景
  yinyezhizhao?: string       // 营业执照
  canyinxuke?: string         // 餐饮许可证
}
export interface IRouteNav extends Pick<RouteRecord, 'name' | 'path'> {
  title: string
}