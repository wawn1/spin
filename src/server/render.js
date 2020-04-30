import React from "react";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import Routes, {routes} from "../routers";
import {Provider} from "react-redux";
import {getStore} from "../store";
import {matchRoutes} from "react-router-config";

const initData = (store, path) => {
  // 可以匹配多级路由
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

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        {Routes}
      </StaticRouter>
    </Provider>
  );
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
};
