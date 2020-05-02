import React from "react";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import Routes, {routes} from "../routers";
import {Provider} from "react-redux";
import {getServerStore} from "../store";
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
  const store = getServerStore(req);
  await initData(store, req.path);

  let context = {};
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        {Routes}
      </StaticRouter>
    </Provider>
  );
  if (context.NOT_FOUND) res.status(404);

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
