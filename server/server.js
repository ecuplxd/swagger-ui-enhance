const http = require("http"),
  fs = require("fs"),
  url = require("url"),
  path = require("path"),
  httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({});

var staticRoot = path.resolve(__dirname, "../dist/swagger-ui");

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  var targetInfo = getTargetInfo(req.url);
  proxyReq.path = targetInfo.path;
});

function getTargetInfo(reqUrl) {
  var { query } = url.parse(reqUrl, true);
  var result = url.parse(query.url, true);
  var target = result.protocol + "//" + result.host;
  return { target, ...result };
}

function serverStatic(pathname, res) {
  var filePath;
  if (pathname === "/" || pathname === "/index") {
    filePath = path.join(staticRoot, "index.html");
  } else {
    filePath = path.join(staticRoot, pathname);
  }

  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.error(`[error][404]: ${filePath}`);
      res.end("<h1>404 not found</h1>");
    } else {
      console.log(`[success] fetch static file: ${filePath}`);
      res.write(file, "binary");
      res.end();
    }
  });
}

function proxyRequest(target, req, res) {
  proxy.web(req, res, {
    target,
    secure: false,
    ignorePath: true,
    changeOrigin: true,
  });
}

function handleRequest(req, res) {
  var { pathname } = url.parse(req.url, true);
  if (pathname.startsWith("/proxy")) {
    var { target } = getTargetInfo(req.url);
    proxyRequest(target, req, res);
    return;
  }

  serverStatic(pathname, res);
}

var port = 5000;
http.createServer(handleRequest).listen(port);

console.log(`server start on ${port}`);
