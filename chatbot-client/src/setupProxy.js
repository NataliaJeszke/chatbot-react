const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://chatbot-react.onrender.com/",
      changeOrigin: true,
    })
  );
};
