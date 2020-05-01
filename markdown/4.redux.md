#### redux

```bash
yarn add redux react-redux redux-thunk
```

```
.
├── containers
    ├── Home
        ├── store
            ├── actionCreators.js
            ├── actions.js
            ├── constants.js
            ├── reducer.js
            └── index.js
        ├── index.js
├── store      
	├── index.js
```

```js
// src/store.js
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {reducer as homeReducer} from "../containers/Home/store";

const reducer = combineReducers({
  home: homeReducer,
});
// 由于在服务器端执行，不能直接导出单例的store，所有用户公用单例不对
const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk));
};

export default getStore;

```

```js
// Home/store/actionCreators.js
import {CHANGE_NAME} from "./constants";

export const changeName = (name) => ({
  type: CHANGE_NAME,
  name,
});
// Home/store/actions.js
import axios from "axios";
import {changeName} from "./actionCreators";

export const getNewName = () => {
  return (dispatch) => {
    axios.get("http://localhost:3000/name").then((res) => {
      dispatch(changeName(res.data.name));
    });
  };
};
// Home/store/constants.js
export const CHANGE_NAME = "change_name";
// Home/store/reducer.js
import {CHANGE_NAME} from "./constants";

const defaultState = {
  name: "xmu",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};
// Home/store/index.js
import reducer from "./reducer";

export {reducer};

```





问题：

redux的一些异步任务，在useEffect生命周期里执行，客户端会执行，但是服务端还不能执行

#### 异步数据服务器渲染

在Route对象里的loadData保存一个函数，这个函数在组件加载前执行组件数据加载逻辑，相当于componentDidMount的异步请求数据的逻辑

redux-thunk异步支持，dispatch的action函数的返回值可以通过dispatch函数执行拿到，loadData返回dispatch函数的返回值，这样就将axios请求的promise传递出来，作为loadData函数的返回值

所有promise执行完，数据就加载完了，Promise.all

通过react-router-config的matchRoutes来将路径匹配出路由对象数组

数组里的route对象身上的loadData函数，就是要先执行完加载数据的任务

```
yarn add react-router-config
```

```js
// routers.js
import React from "react";
import {Route} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    loadData: Home.loadData,
    key: "home",
  },
  {
    path: "/login",
    exact: true,
    component: Login,
    key: "login",
  },
];

export default (
  <div>
    {routes.map((route) => (
      <Route {...route} />
    ))}
  </div>
);

```

```js
// Home/store/actions.js
export const getNewName = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3000/name").then((res) => {
      dispatch(changeName(res.data.name));
    });
  };
};
// Home/index.js
Home.loadData = (store) => {
  return store.dispatch(getNewName());
};
dispatch可以往参数函数里注入dispatch函数，拿到并return参数函数的返回值
```



```js
// server/render.js
const initData = (store, path) => {
  // 但是感觉对多级路由匹配不太对
  const matchedRoutes = matchRoutes(routes, path);
  const promises = [];
  matchedRoutes.forEach(({route}) => {
    if (route.loadData) {
      promises.push(route.loadData(store));
    }
  });
  return Promise.all(promises);
};
export const render = async (req, res) => {
  const store = getStore();
  await initData(store, req.path);
    ...
}
```



#### 闪屏

由于服务端渲染好了，但是数据存在服务端store里，客户端初始state是空，走的还是客户端useEffect请求的逻辑，此时需要将服务端store数据序列化，传递给客户端，客户端将此数据作为初始化state

```js
// server/render.js
res.send(`
  <html>
    <body>
        <div id='root'>${content}</div>
        <script>
            window.context={
                state: ${JSON.stringify(store.getState())}
            }
        </script>
        <script src='/index.js'></script>
    </body>
  </html>
  `);
```

```js
// store/index.js
export const getClientStore = () => {
  const defaultState = window.context.state;
  return createStore(reducer, defaultState, applyMiddleware(thunk));
};
// client/index.js
const store = getClientStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{Routes}</BrowserRouter>
    </Provider>
  );
};
```



#### 重复请求

同构的项目，一个组件的显示，有可能是从前端路由过来的（未请求数据，需要useEffect里面请求），有可能是url请求服务器渲染过来的(携带了序列化的数据)，所以useEffect里面不能删掉，但是如果从后端请求过来的，useEffect又会执行，会导致两次请求浪费。手动判断是否是默认值数据

```js
import {defaultState} from "./store/reducer";
useEffect(() => {
    if (name === defaultState.name) {
      _getNewName();
    }
  }, []);
```

