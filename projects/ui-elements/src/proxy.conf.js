const PROXY_CONFIG = {
    "/api/*": {
      "changeOrigin": true,
      "logLevel": "debug",
      "cookieDomainRewrite": "localhost",
      "target": "http://localhost:3410",
      "secure": false
    }
  };

  module.exports = PROXY_CONFIG;
