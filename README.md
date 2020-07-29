# React移动端项目-宜居租房
## 简介
本项目采用React脚手架create-react-app搭建,使用less预处理配合rem,使用redux保存调用相关数据.
后端mock数据采用node.js的express框架进行创建.前后端分离,跨域使用http-proxy-middleware中间件.
使用模块化的方式处理各个页面.公共组件抽离到统一目录下方便调用.

## 技术栈
React+React-Router(v4)+React-Redux+Less+Express+Fetch

## 项目启动
```js
//安装依赖
npm install
```
再另开一个终端
```js
node ./mock/index.js
```
回到第一个终端
```js
npm start
```
## 环境配置
1. less配置

通过`npm install less less-loader -S`安装less.
`npm eject`加载webpack配置,打开`config/webpack.config.js`文件,
找到`sass`配置,复制一份.改为less配置.
```js
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
```
搜索`sassRegex`和`sassModuleRegex`将相应的文件配置复制一份进行修改.
```js
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
    ),

    sideEffects: true,
},
{
    test: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
        modules: {
        getLocalIdent: getCSSModuleLocalIdent,
        },
    },
    'less-loader'
    ),
},
```
## 经验之谈
>如果出现`Cannot find module 'resolve'`报错,说明依赖没有安装好,大部分是网络原因,运行`npm install`重新安装一次就好了.
2. rem配置

在index.html中的`<header>`最后位置放入下列代码.
```js
<script>
(function (doc, win) {
    var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=750){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
</script>
```
3.  创建文件夹

在`src`下创建以下文件夹.
+ 路由文件夹`router`
+ 公共组件文件夹`components`
+ 工具类文件夹`utils`
+ 页面文件夹`pages`
+ 静态文件夹`static`

在`pages`下创建各个文件夹
`Home, Shop, Life, Mine, NotFound`下生成组件`index.jsx`和`style.less`.

在`static`文件夹下放入初始化资源
css,iconfont,images

4. 路由支持

`npm install react-router react-router-dom --save`

`router`文件夹下创建`AppRouter.jsx`文件,将该文件导出挂载到`app.js`文件内作为组件.
`AppRouter`文件引入`{Route, HashRouter, Switch}`,pages下各个页面,将路径和component填入各个`Route`中.

5. css文件初始化

在`static/common.less`中将样式初始化,或者直接引入`normalize.css`.

6. 底部导航

引入iconfont字体图标库.在index.js中也引入.
底部导航是公共组件,在components下创建FootNav文件夹.
引入router的NavLink,因为需要点击跳转.(注意首页的路径使用exact精确匹配)
因为每个页面都会用到底部导航,故在每个页面进行引入.
在各个底部菜单放入图标`<i className="">`引入各个图标.

7. HomeHeader

创建`Home/HomeHeader`,按照划分分为3部分,`home-header-left,right,middle`.
其中`home-header-middle`部分包含一个`search-container`,之中包含一个iconfont和一个`input`.

8. 轮播图

安装swiper
```js
npm install --save react-swipeable-views
```
在公共组件components文件夹下创建轮播图文件夹Swiper.
引入
```js
import SwipeableViews from 'react-swipeable-views'
```
将图片添加到staic/images文件夹下.
将引入写到home.jsx中,由home向swiper组件传递banner.
```js
<Swiper banners={ [banners1, banners2, banners3] } />
```
Swiper中直接将得到的`this.props.banners`用`map`方法遍历到`SwipeableVIews`中.

### 添加轮播图底部小圆点
在swiper文件夹下创建Pagination文件夹及相关文件.
`<Pagination />`和`<SwipeableViews>`是同级关系.
小点的数量由banners的长度决定,在`<Pagination dots={banners.length} />`中传递给子组件.
此时dots是数字,需要的是数组.使用new Array的方法将长度转化为数组
```js
//转化为[1,1,1]
const dotsArr = new Array(dots).fill(1)
```
将数组map到`<li></li>`中.
#### 将小点和轮播图绑定
给`<SwipeableViews>`绑定事件,滑动到的当前的图的下标currentIndex,给赋值到index,传递给`<Pagination />`,
它得到currentIndex后拿到`<li>`中进行判断,
```js
<li className={currentIndex === index ? "selected" : ""}>
```
9. 搭建服务器

在项目根目录创建mock文件夹(或者server).
包含config,index,router文件和一个data文件夹.
data文件夹下创建home文件夹,热销商品数据`hotdata.js`.
安装express,`node index.js`启动.

10. 跨域问题

安装`npm install http-proxy-middleware --save`
创建`src/setupProxy.js`文件
```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(createProxyMiddleware ("/api", { target: "http://localhost:5000/" }));
};

```
11. Http处理网络请求

`utils`文件夹下创建`http.js`
主要由两个函数构成,`getData, postData`
```js
import qs from 'querystring'

export function getDate(url){
    const result = fetch(url)
    return result
}

export ...
```
12. 创建API

创建`src/api/base.js`和index.js,homehot.js.
```js
//base.js
const base = {
    baseUrl: "http://localhost:5000",
    homehot1: "/api/homehot1",
    homehot2: "/api/homehot2" 
}
```

```js
// 首页热门推荐
import base from "./base"
import {getData} from "../utils/http"

const homehot = {
    homehot1Data(){
        return getData(base.homehot1)
    },
    homehot2Data(){
        return getData(base.homehot2)
    }
}

export default homehot
```
```js
//index.js
import homehot from './homehot'
//这里注意加括号
export default {homehot}
```

13. 创建HomeHot文件夹

引入api.在componentDidMount中调用api请求数据.
```js
componentDidMount(){
    api.homehot.homehot1Data()
        .then(res => res.json())
        .then(data =>{ console.log(data)})
}
```
14. 分离HomeHot的UI

创建`./HomeHot/HomeHotView`.
将data传入HomeHotView,HomeHotView中map遍历数据data,放在li中.
创建style.less样式.

15. 城市选项

创建`src/pages/City`.将相关引入放到router中.
给北京添加`<Link>`,可以点击跳转到城市页面.

16. 城市选择页面

创建公共头部`component/Header`.
有一个返回箭头,一个title.其中title由使用页面传参
返回箭头绑定返回事件.
`window.history.back(-1)`
`this.props.history.push("/home")`

17. 当前城市

创建`./City/CurrentCity`,city也是从父级传递过来.

18. 热门城市

创建`./City/HotCity`.
点击传递参数时,建议使用bind传参,属于隐式传递.使用箭头函数属于显式传递.
此时事件定义时就不能用箭头函数了.
```js
//定义事件
clickHandler(cityName){
    console.lig(cityName)
}
//...
//向事件函数传参
//bind隐式传递
<li onClick={this.clickHandler.bind(this,'北京')}>北京</li>
//箭头函数,显式传递
<li onClick={(e)=>this.clickHandler('北京',e)}>北京</li>
```

19. 创建Redux

由于每个页面都需要获取城市信息,所以需要使用Redux存储.

安装redux

`npm install --save redux react-redux`

安装redux调试工具

`npm install --save-dev redux-dectools`
 创建`src/store/index.js`,`src/actions/city.js`,`src/actions/index.js`和`src/reducer/index.js`.
 再创建constants文件用于定义基本字符串.
 ```js
 //src/constants/city.js
 export const INIT_CITY = "INIT_CITY"
 export const UPDATE_CITY = "UPDATE_CITY"
```
创建初始化城市initCity和更新城市updateCity的函数
```js
//src/actions/city.js
import * as cityActions from "../constants/city";

export function initCity(data) {
  return {
    type: cityActions.INIT_CITY,
    data
  };
}

export function updateCity(data) {
  return {
    type: cityActions.UPDATE_CITY,
    data
  };
}
```
创建city的Reducer

```js
//src/reducers/city.js
import * as cityActions from '../constants/city'

const initState = {}

export default function city(state = initState, action ){
    switch(action.type){
        case cityActions.INIT_CITY:
            return state = action.data;
        case cityActions.UPDATE_CITY:
            return state = action.data;
        default:
            return state;
    }
}   
```
合并Reducer

```js
//src/reducers/index.js
import { combineReducers } from "redux"
import city from './city'
const rootReducers = combineReducers({
    city
})
export default rootReducers
```
将Reducer传入store中,创建好store.
```js
//src/store/index.js
import { createStore } from 'redux'
import rootReducers from '../reducers'

export default function configureStore(){
    const store = createStore(rootReducers, 
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() :undefined
        )
    return store
}
```

20. 使用Redux

主入口文件index.js进行关联.
```js
//index.js
import {Provider} from 'react-redux'
import configtureStore from './store'
const store = configtureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
```
创建初始化页面`src/pages/app.jsx`

在index页面包裹所有的二级路由,并且路径指向首页

初始化项目需求
1.1 城市初始化

引入`bindActionCreators`,`connect`
```js
//app.js
import { connect } from 'react-redux'
import * as cityActions from "../actions/city"
import { bindActionCreators } from "redux"

class App extends React.Component{
    //初始化城市数据
    componentDidMount(){
        this.props.cityActions.initCity({
            cityName: '北京
        })
    }
    render(){
        return(
            <div>{this.props.children}</div>
        )
    }
}
mapStateToProps = state => {
    return {
        city: state.city
    }
}
mapDispatchToProps = dispatch => {
    return {
        cityActions: bindActionCreators(cityAction, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

```
1.2 在Home页面引入读取操作

```js
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        city: state.city
    }
}

export default connect(
    mapStateToProps
)(Home)
```
1.3 在City页面也要引入

1.4 将HotCity选中的城市传递到主组件City

定义自定义事件进行传递

传递之后,引入mapDispatchToProps触发修改

改变之后,返回上一页面

1.5 传递城市信息

修改mock中参数
```js
//mock/router.js
var url = require("url")
router.get(config.homehot1,function(req,res){
    //接收城市作为参数
    var cityName = url.parse(req.url,true).query.city
    console.log(cityName)
    res.send(homehot.hot1)
})
```
Home组件中<HomeHot />得到city参数
HomeHot组件中接受到city参数
api中同样接受到参数,注意?符号.
```js
const homehot = {
    homehot1Data(city){
        return getData(base.homehot1+"?city="+city)
```
city如果被选中后又刷新,需要保存之前的数据.
在City组件中使用`localStorage.setItem("city",cityName)`
之后再componentDidMount中请求city数据可以默认先查看本地是否有数据
```js
const city = this.props.city || localStorage.getItem("city") ||  '北京'
```

21. 搜索框

搜索框可复用,放在公共组件component中.创建`SearchInput`组件.绑定相应事件.
创建`src/pages/Search`页面.在路由中引入
搜索框组件中,绑定按下Enter开始搜索
```js
//src/components/SearchInput
keyUpHandler = (event)=>{
    if(event.keyCode === 13){
        this.props.history.push('/search')
    }
}

...
<input onKeyUp={this.keyUpHandler}/>
```
由于history在组件SearchInput中并没有(只有直接被路由管理的才有),需要从父组件HomeHeader中获取,也没有,继续向上索取,
最后在Home组件中获取.
22. 搜索页面

搜索后跳转到搜索页面,创建搜索页面的顶部搜索框<SearchHeader>,依旧传入history.
搜索时所填入的数据需要带到搜索页面,用到路由传参.
在路由中
```js
<Route path="/search/:content" component={Search}></Route>
```
数据在SearchInput中,将value附加到push的网址后面传递出去.
```js
this.history.push("/search/"+this.state.value)
```
获取数据,
```js
this.props.match.params.content
```

23. 搜索服务器

创建`mock/data/search/index.js`
在`mock/router.js`创建搜索接口
```js
// 搜索接口
router.get("/search",function(req,res){
    // 接受参数:city,searchcontent
    var cityName = url.parse(req.url, true).query.city;
    var searchContent = url.parse(req.url, true).query.content;
    var page = url.parse(req.url, true).query.page;
    console.log("城市："+cityName,"搜索内容："+searchContent,"页码："+page);
    res.send(searchData)
})
``` 
24. 添加API

创建`api/search`
```js
// 搜索接口
import base from "./base"
import {getData} from "../utils/http"

const search = {
    searchData(city,content){
        return getData(base.search+"?city="+city+"&content="+content)
    }
}
export default search
```
`/api/index`中引入再导出.

25. Search页面

创建处理搜索结果的页面SearchList
SearchList下创建SearchListView
SearchListView下创建Item
```js
//SearchList
componentDidMount(){
    //获取城市
    const city = this.props.city
    //获取搜索内容
    const content = this.props.content
    api.search.searchData(city,content)
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchData: data
            })               
        })
}
    render(){
        return (
            <div>
                {
                 this.state.searchData.data ?
                 <SearchListView data={this.state.searchData.data}/> 
                 : <div>数据正在加载</div>
                }
           </div>
        )
    }
```
SearchListView中将得到的data使用map方法return出Item进行展示.
Item将data传入组件内.
组件内将传入的data拆解,渲染.
```js
//Item
const item = this.props.data
return (
    <div className="list-item">
        <img src={item.img} alt=''/>
        <div className="mask">
            <div className="left">
                <p>{item.title}</p>
                <p>{item.houseType}</p>
            </div>
            <div className="right">
                <div className="btn">
                    {item.rentType}
                </div>
                <p dangerouslySetInnerHTML={{__html: item.price+"/月"}}/>
            </div>
        </div>
    </div>
```
#### 再次请求的刷新问题
在生命周期的`componentDidUpdate`中再次请求
这时组件渲染之后加载
将多次使用的api函数封装成一个函数
```js
http(city,content){
        api.search.searchData(city,content)
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchData: data
            })               
        })
     }
```
将上面的函数在`componentDidMount`和`componentDidUpdate`中分别调用.
注意这里容易死循环,组件更新后data被setState重新赋值,然后更新,更新后得到新的参数,又继续更新.死循环.
>解决办法:
加上判断,componentDidUpdate有两个参数,prevProps和prevState,表示上一次的属性和state.
比较本次搜索的content和上次是否相等,如果是,就return.
否则,发起网络请求.
```js
componentDidUpdate(prevProps,prevState){
    const city = this.props.city
    const content = this.props.content
    if(prevProps.content === content){
        return
    }else{
        this.http(city, content)
    }
}
```
26. 搜索详情页的瀑布流

封装上拉加载组件`LoadMore`
判断是否加载到`LoadMore`，监听滚动事件.
获取元素偏移量,创建`Refs`.
```js

constructor(){
    super()
     this.load = React.crateRef()
}
componentDidMount(){
    window.onScroll = () => {
         console.log(this.load.current)
}
}

render(){
    return(
        <div ref={this.load}></div>
    )
}
```
滚动事件需要加上函数防抖,只要滚动就不加载触发函数,稍等100ms后加载一次.这就是函数防抖`debounce`.
```js
//loadMore.js
componentDidMount(){
//事件防抖
let timer = null
const winHeight = document.documentElement.clientHeight
window.onscroll = ()=>{
    if(timer){
        clearTimeout(timer)
    }
    timer = setTimeout(()=>{
        if(this.load.current.getBoundingClientRect().top < winHeight){
            this.props.onLoadMore()
        }
    },100)
  }
}
componentWillUnmount(){
    // 取消滚动事件
    window.onscroll = null;
}
```

数据加载时是会更新数据,需要把新数据和旧数据拼接在一起.注意要设置初始化的state.
状态上再添加hasMore,判断是否还有数据.
将SearchData全部更改为[],获取时也就只要获取对象里的data.

在SearchList中增加生命周期componentWillUnmount,将请求取消.因为页面如果被点击而跳转到其他页面,请求是异步操作,有可能还没返回.
等回来了数据发现没有state接收请求了,会报错.需要在页面卸载时取消请求.
```js
//searchList.js
http(city,content,page){
    api.search.searchData(city,content,page)
    .then(res => res.json())
    .then(data => {
        this.setState({
            searchData: this.state.searchData.concat(data.data),
            page: this.state.page + 1,
            hasMore: data.hasMore
        })               
    })
    }
//如果数据请求未完成就跳转到其他页面需要取消网络请求,否则报错
componentWillUnmount(){
    // 取消网络请求
    this.setState = (state,callback) => {
        return;
    }
}
```
增加页码,修改服务器.
注意修改api
```js
//api/search.js
const search = {
    searchData(city,content,page){
        return getData(base.search+"?city="+city+"&content="+content+"&page="+page)
    }
}
```
每次做网络请求,page+1.
添加hasMore参数,判断是否还有数据.

27. 详情页路由配置

创建`pages/Details`.路由中增加详情页.
在Item页面进行路由传参,item由Link包裹.`<Link to={`/detail/${item.id}`}>`

28. 详情页服务端配置

创建`mock/data/details/index.js`.
在`mock/router.js`中增加详情接口.
```js
//mock/router.js
//详情接口
router.get("/details", function(req,res){
  //接收商品id
  var id = url.parse(req.url, true).query.id
  console.log(id)
  res.send(detailData)
})
```
同时导入detailData数据.

29. 详情页API部分
```js
//api/details.js
import base from "./base"
import { getData } from "../utils/http"

const details = {
    detailsData(id){
        return getData(base.details+"?id="+id);
    }
}

export default details;
```
其他文件中增加detail的选项.

30. detailData分离

创建`page/Details/DetailsData`.用来请求数据.
在detail中把id传递进去.
```js
export default class index extends Component {
  constructor() {
    super();
    this.state = {
      datas: {}
    };
  }

  componentDidMount() {
    const id = this.props.id;
    api.detail
      .detailsData(id)
      .then(res => res.json())
      .then(data => {
        this.setState({
          datas: data
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.datas.img ? (
          <DetailsDataView data={this.state.datas} />
        ) : (
          <div>数据请求中</div>
        )}
      </div>
    );
  }
}
```

创建`page/Details/DetailsDataView`.用来将请求数据展示出来.
再把请求到的datas传递给DetailsDataView.
DetailsDataView需要多个公共组件,可以直接引入.

31. Tab切换

创建公共组件Tabs.
使用React.children.map()去遍历子元素.
绑定onClick事件给点击的绑定高亮.将index赋值给currentIndex.
```js
<div className="Tab_title_wrap">
{
    React.Children.map(this.props.children, (element,index)=>{
        return(
            <div className={this.check_title_index(index)} 
            onClick={this.tabHandler.bind(this,index)}>
                {element.props.tabname}
            </div>
        )
    })
}
```
使用函数赋值给className的显隐切换.
```js
check_title_index = index=>{
    return index === this.state.currentIndex ? "Tab_title active" : "Tab_title"
}
check_item_index = index=>{
    return index === this.state.currentIndex ? "show" : "hide"
}
```
32. 将信息放到Tabs内

33. 增加评论服务端数据

创建`mock/data/comment`.
增加`mock/router`评论接口.
```js
//评论接口
router.get("/comment", function(req,res){
  //获取商品ID
  var id = url.parse(req.url, true).query.id
  res.send(commentData)
})
```
34. 增加api中comment

35. 创建详情页DetailData的CommentView组件
将其中的Item拆分出来

36. Star组件

创建公共组件Star.
使用数组判断星星是否高亮.
```js
render(){
    if(star >= 5){
        star = 5
    }
    return(
        <div className="star-container">
            {[1,2,3,4,5].map((item,index)=>{
                let lightClass = star >= item ? ' light' : ''
                return(
                    <i key={index} className={'icon-star' + lightClass}></i>
                )
            })}
        </div>
    )
}
```

37. 登录页面

创建`pages/Login`页面,储存到Redux.
引入到路由.
创建`actions/userinfo.js`
创建`reducers/userinfo.js`,将userinfo写到`reducers/index.js`中.

创建`pages/Login/LoginView`页面.展示登录界面.
绑定到Login页面,通过绑定事件loginHandler获取user

38. 收藏功能

新增`pages/Details/DetailsData/StoreBuy/StoreBuyView`.
在DetailsDataView中引入.
收藏页面也增加Redux的连接.点击收藏存在redux中.
创建Redux一套流程.
注意此时actions中的收藏初始数据应为数组.
state存储也是数组形式,
```js
import * as collectActions from "../constants/collect"

const initState = [];
export default function collect(state = initState, action) {
    switch (action.type) {
        case collectActions.COLLECT:
            state.push(action.data)
            return state;
        case collectActions.UNCOLLECT:
            return state.filter((element) => {
                //filter作用把当前数组的element遍历,如果和当前所选不等,就是为true
                //就把该element添加到新数组里,否则,不添加,这样就排除了所选元素
                if (element.id !== action.data.id) {
                    return element;
                }
            })
        default:
            return state;
    }
}
```
判断是否收藏.
```js
//StoreBuy
storeHandler = ()=>{
    const username = this.props.userinfo.name
    const goods_id = this.props.id
    if(username){
        //调用函数判断
        if(this.isStore()){
            //为true,说明有,取消收藏
            this.props.collectActions.cancelCollect({
                id: goods_id
            })
        }else{
            //收藏实现
            this.props.collectActions.setCollect({
                id: goods_id
            })
        }

    }else{
        //去登陆
        this.props.history.push("/login")
    }
}

//收藏判断
isStore = ()=>{
    const id = this.props.id
    const collects = this.props.collect
    //some判断集合中是否有该id,有返回true
    return collects.some((element)=>{
        return element.id === id 

    })
}
```

39. 购物车功能

创建`pages/ShopCart`.
子组件在创建`OrderView`和`UserView`
给`HomeHeader`中购物车图标增加`Link`标签跳转.
进入组件之前判断登录状态.关联redux.
```js
//ShopCart
componentWillMount(){
const userinfo = this.props.userinfo.name
    if(userinfo){
        return
    }else{
        //重定向到登录
        this.props.history.push("/login")
    }
}
```

40. 新增order的服务端数据

创建`mock/data/order`文件夹.

```js
//order
module.exports = [
    {
        id: Math.random().toString().slice(2),
        title: "东城区 安外大街3号院",
        houseType: "1室1厅1卫 - 48m²",
        price: "4800",
        rentType: "整租",
        commentState: 0,
        img: "http://iwenwiki.com/api/livable/shop/z1.jpg"
    },
    {
        id: Math.random().toString().slice(2),
        title: "整租 · 义宾北区2居室-南北",
        houseType: "2室1厅1卫 - 78m²",
        price: "7200",
        rentType: "整租",
        commentState: 0,
        img: "http://iwenwiki.com/api/livable/shop/z5.jpg"
    },
    {
        id: Math.random().toString().slice(2),
        title: "整租 · 杨庄北区2居室-南北",
        houseType: "1室1厅1卫 - 48m²",
        price: "4300",
        rentType: "整租",
        commentState: 2,
        img: "http://iwenwiki.com/api/livable/shop/z6.jpg"
    }
]
```

`mock/router.js`中新增order.

```js
// 购物车

router.get("/car",function(req,res){
  var user =  url.parse(req.url, true).query.user;
  console.log("用户："+user);
  res.send(orderComment)
})

router.post("/ordercomment",function(req,res){
  var info = req.body.info;
  console.log("评论信息："+info);
  res.send({
      msg:'评价成功'
  })
})
```
41. 新增order的api

创建`api/order`和`api/ordercomment`.
在`base.js`中新增order和ordercomment的路由.
在`index.js`中新增order和ordercomment的引入.
购物车评价接口需要写入数据,所以是postData.
```js
//ordercomment.js
// 订单评价接口
import base from "./base"
import {postData} from "../utils/http"

const orderComment = {
    orderCommentData(info){
        return postData(base.ordercomment,info)
    }
}

export default orderComment
```

42. 网络请求

引入api,在登录后发送网络请求
```js
//shopcar
componentWillMount(){
    const userinfo = this.props.userinfo.name
    if(userinfo){
    //网络请求
    api.order.orderData(userinfo)
    .then(res=>res.json())
    .then(data=>{
        this.setState({
            order: data
        })       
    })

    }else{
        //重定向到登录
        this.props.history.push("/login")
    }
```
把数据order传给`<OrderView />`.
还是先判断数据是否到来
```js
{
    this.state.order.length > 0 ?
    <OrderView data={this.state.order} />
    : <div>数据加载中</div>
}
```
43. 数据接收渲染

OrderView接收上级传过来的数据,使用map渲染到页面.
```js
render(){
    const data = this.props.order
    return(
        <div>
            {data.map(item, index)=>{
                return <Item key={index} data={item} />
            }}
        </div>
    )
} 
```
44. Item渲染
```js
render() {
    const data = this.props.data
    return (
        <div className="clear-fix order-item-container">
            <div className="order-item-img float-left">
                <img src={data.img} alt={data.title}/>
            </div>
            <div className="order-item-comment float-right">
                {
                    data.commentState === 0?
                    <button className="btn">评价</button>
                    : <button className="btn  unselected-btn">已评价</button>
                }
            </div>
            <div className="order-item-content">
                <span>商户:{data.title}</span>
                <span>类型:{data.houseType}</span>
                <span>价格:{data.price}</span>
            </div>
        </div>
    )
}
```
45. 添加评价

给评价绑定事件.
评价状态commentState的值0,1,2分别代表未评价,评价中,已评价.
```js
this.state.commentState === 0 ?
<button className="btn" onClick={this.commentHandler }>评价</button>
: this.state.commentState === 1 ?
<button className="btn">评价中</button>
: <button className="btn  unselected-btn">已评价</button>
```
46. 添加评价框
```js
{
this.state.commentState === 1 ?
<div className="comment-text-container">
<textarea style={{ width: '100%', height: '80px' }} className="comment-text" ref={ this.commentText }></textarea>
<button className="btn" onClick={this.submitCommentHandler}>提交</button>
&nbsp;
        <button className="btn unseleted-btn" onClick={this.hideComment}>取消</button>
</div>
:  ""
}
```

50. 评价事件提交到后台

后台mock/router里创建评价接口.
```js
//mock/router.js
router.post("/ordercomment",function(req,res){
  var info = req.body.info;
  console.log("评论信息："+info);
  res.send({
      msg:'评价成功'
  })
})
```
`mock/index.js`中添加解析.
```js
//mock/index.js
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}))
```
51. 增加相关API

创建`api/ordercomment`
```js
// 订单评价接口
import base from "./base"
import {postData} from "../utils/http"

const orderComment = {
    orderCommentData(info){
        return postData(base.ordercomment,info)
    }
}

export default orderComment
```
52. 创建非受控组件
```js
this.commentText = React.createRef()

submitCommentHandler(){
    this.setState({
        commentState:2
    })
    // 发送网络请求
    api.orderComment.orderCommentData({
        info:this.commentText.current.value
    })
    .then(res => res.json())
    .then(data => {
        alert(data.msg);
    })
}

<textarea ref={this.commentText}></textarea>
```
页面暂时写这么多.