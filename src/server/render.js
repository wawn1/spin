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
      const promise = new Promise((resolve, reject) => {
        route.loadData(store).then(resolve).catch(resolve);
      });
      promises.push(promise);
    }
  });
  return Promise.all(promises);
};

export const render = async (req, res) => {
  const store = getServerStore(req);
  await initData(store, req.path);

  let context = {css: []};
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        {Routes}
      </StaticRouter>
    </Provider>
  );
  if (context.NOT_FOUND) res.status(404);
  const cssStr = context.css.length ? context.css.join("\n") : "";

  res.send(`
  <html>
    <head>
      <title>ssr</title>
      <style>${cssStr}</style>
    </head>
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
