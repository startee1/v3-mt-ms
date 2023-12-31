# 介绍

_注1：该系统个人开发练手_

_注2：欢迎查看，提出建议_

# 技术栈

前端：vue + element-plus + pinia + vue-router

后端: mysql + nodejs + express  等 node 常用包 

# 相关链接

[前端页面](https://github.com/startee1/vue3-minimeituan) （未完成/未接通）

# 功能

- [×] Login
- [×] UserInfo
- [×] AdminSettings
- [×] AdminUser
- [×] AdminShopInfo
- [×] Shop
- [×] Goods
- [ ] Error
- [×] Logs
- [×] Fix


# 页面

```
.
├── public                                  静态资源目录
├── src                                     网站主要内容
│   ├── assets                              静态资源目录
│   │   └── images                          静态图片
│   ├── directives                          自定义指令
│   ├── component                           公共组件
│   │   ├── Global                
│   │   │   ├── Index.vue                   全局页面进入页
│   │   │   ├── GSlider.vue                 全局页面侧边页
│   │   │   ├── GHeader.vue                 全局页面顶部页
│   │   │   ├── GMain.vue                   全局页面核心页
│   │   │   └── Permission.ts               权限列表
│   │   ├── LogsEntry         
│   │   │   └── LogsEntry.vue               日志页进入模块
│   │   ├── EPcomponents                    个人改造 Element-plus 组件
│   │   │   ├── EPcTableV2.vue              虚拟化表格
│   │   ├── Mycomponents                    个人组件
│   ├── view                                页面
│   │   ├── Login                 
│   │   │   ├── Login.vue                   登录页
│   │   │   ├── Register.vue                注册页
│   │   │   └── Basic.vue                   登录注册页面布局
│   │   ├── UserInfo              
│   │   │   └── UserInfo.vue                个人信息页 / 可修改信息
│   │   ├── AdminSettings             
│   │   │   └── AdminSettingsFoodType.vue   食品类型选项           
│   │   ├── AdminUser                        
│   │   │   └── AdminUserList.vue           用户列表            [在此添加商铺]
│   │   ├── AdminShop
│   │   │   ├── AdminShopOrder.vue          全部商铺订单数据页      
│   │   │   └── AdminShopComment.vue        全部商铺评论页       
│   │   ├── Shop  
│   │   │   ├── ShopComment.vue             商铺评论页
│   │   │   ├── ShopOrder.vue               商铺订单数据页
│   │   │   └── ShopInfo.vue                商铺详情信息页 / 可修改信息
│   │   ├── Goods              
│   │   │   ├── children                       
│   │   │   │   ├── GoodsChioce.vue         商品规格页
│   │   │   │   └── GoodsTable.vue          商品编辑表格
│   │   │   ├── GoodsList.vue               商品列表            
│   │   │   ├── GoodsAdd.vue                商品添加页       
│   │   │   └── GoodsInfo.vue               商品信息页 / 可修改信息
│   │   ├── DataShow              
│   │   │   └── DataShow.vue                数据展示页
│   │   ├── Error                           错误页面
│   │   │   ├── 401.vue                     401 错误
│   │   │   └── 404.vue                     404 错误
│   │   ├── Logs                  
│   │   │   └── Logs.vue                    开发日志页
│   │   ├── Fix                  
│   │   │   └── Fix.vue                     特殊按钮
│   ├── utils                               工具函数
│   ├── service                             链接 api
│   │   ├── BaseApi.ts                      api 基础配置
│   │   ├── Api                             各类 api 接口
│   │   └── api.ts                          api 全部接口暴露文件
│   ├── types                               类型文件
│   ├── App.vue                             页面入口文件
│   ├── main.ts                             程序入口文件
│   ├── style.css                           全局样式文件
│   ├── vite-env.d.ts                       环境配置文件
│   ├── pinia                               状态管理
│   └── router                              路由
├──
.
```