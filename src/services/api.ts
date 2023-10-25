/**
 * 用作路由的连接配置
 */
import api from './base'
import type {AxiosRequestConfig } from "axios";
import type {
  IShop,
  IUser,
  IGoods
} from '@/types'

const pre = {
  ADMIN: `/admin`,
  USER: `/user`,
  SHOP: `/shop`,
  MAP: `/map`,
  TYPE: `/type`,
  MENU: `/menu`,
  GOODS: `/goods`,
  DATA: `/data`,
}
/**
 * 登录接口
 */
async function LoginApi (data:IUser) { 
  return await api.post(`${pre.ADMIN}/login`, data)
}
/**
 * 注册接口
 */
async function RegisterApi (data:IUser) {
  return await api.post(`${pre.ADMIN}/register`, data)
}
/**
 * 获取用户列表接口
 */
async function UserListApi (page:number) {
  return await api.get(`${pre.USER}/list`, {params:{page}})
}
/**
 * 获取用户总数接口
 */
async function UserCountApi () {
  return await api.get(`${pre.USER}/count`)
}
/**
 * 删除用户接口
 */
async function DeleteUserApi (id:number) {
  return await api.post(`${pre.USER}/delete`, {id})
}
/**
 * 更改用户密码接口
 */
async function UpdateUserPasswordApi (id: number, username: string, beforePassword: string, afterPassword: string) {
  return await api.post(`${pre.USER}/password`, {id, beforePassword, afterPassword, username})
}
/**
 * 注册商铺接口
 */
async function RegisterShopApi () {
  return await api.post(`${pre.ADMIN}/registerShop`)
}
/**
 * 获取商铺基本信息是否存在接口
 */
async function ShopCheckApi (shopid:number) {
  return await api.get(`${pre.SHOP}/check`,{params:{shopid}})
}
/**
 * 添加商铺基本信息接口
 */
async function ShopInitInfoApi (shop:IShop, shopid: number) {
  return await api.post(`${pre.SHOP}/init`,{info: shop, shopid})
}
/**
 * 更改商铺基本信息接口
 */
async function ShopUpdateInfoApi (shop:IShop, shopid: number) {
  return await api.post(`${pre.SHOP}/update`,{info: shop, shopid})
}
/**
 * 地址搜索检索接口
 */
async function MapSearchApi (key: string) {
  return await api.get(`${pre.MAP}/search`, {params:{key}})
}
/**
 * 获取商铺分类接口
 */
async function ShopTypeApi () {
  return await api.get(`${pre.TYPE}/list`)
}
/**
 * 更改商铺分类图片接口
 */
async function ShopTypeImageApi (name: string, id: number) {
  return await api.post(`${pre.TYPE}/img`, {name,id})
}
/**
 * 添加分类接口
 */
async function ShopTypeAddApi (name: string, parentid: number) {
  return await api.post(`${pre.TYPE}/add`, {name, parentid})
}
/**
 * 添加分类接口
 */
async function ShopTypeDeleteApi (id: number) {
  return await api.post(`${pre.TYPE}/del`, {id})
}
/**
 * 获取商铺菜单分类接口
 */
async function MenuApi (shopid: number) {
  return await api.get(`${pre.MENU}/list`, {params:{shopid}})
}
/**
 * 添加商铺菜单分类接口
 */
async function MenuAddApi (name: string, shopid:number) {
  return await api.post(`${pre.MENU}/add`, {name, shopid})
}
/**
 * 删除商铺菜单分类接口
 */
async function MenuDelApi (id: number) {
  return await api.post(`${pre.MENU}/del`, {id})
}
/**
 * 获取商品接口
 */
async function GoodsInfoApi (id: number) {
  return await api.get(`${pre.GOODS}/info`, {params:{id}})
}
/**
 * 获取商品列表接口
 */
async function GoodsListApi (shopid: number) {
  return await api.get(`${pre.GOODS}/list`, {params:{shopid}})
}
/**
 * 更新商品接口
 */
async function GoodsUpdateApi (info:IGoods, id: number) {
  console.log(info,id)
  return await api.post(`${pre.GOODS}/update`, {info, id})
}
/**
 * 添加商品接口
 */
async function GoodsAddApi (goods:IGoods) {
  return await api.post(`${pre.GOODS}/add`, {goods})
}
/**
 * 删除商品分类接口
 */
async function GoodsDelApi (id: number) {
  return await api.post(`${pre.GOODS}/del`, {id})
}
/**
 * 获取用户数据接口
 */
async function DataShowApi () {
  return await api.get(`${pre.DATA}/all`)
}

export {
  LoginApi,
  RegisterApi,
  UserListApi,
  DeleteUserApi,
  UserCountApi,
  UpdateUserPasswordApi,
  RegisterShopApi,
  ShopCheckApi,
  ShopInitInfoApi,
  ShopUpdateInfoApi,
  MapSearchApi,
  ShopTypeApi,
  ShopTypeImageApi,
  ShopTypeAddApi,
  ShopTypeDeleteApi,
  MenuApi,
  MenuAddApi,
  MenuDelApi,
  GoodsInfoApi,
  GoodsUpdateApi,
  GoodsListApi,
  GoodsAddApi,
  GoodsDelApi,
  DataShowApi,
}