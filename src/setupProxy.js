const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1/search",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
      secure: false,
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
      },
      onError: (err, req, res) => {
        console.error("Proxy error:", err);
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Something went wrong with the proxy.");
      },
    })
  );
};
