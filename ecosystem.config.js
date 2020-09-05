const path = require("path");

module.exports = {
  apps : [{
    name: 'workfinder_backend',
    script: './server.js',
    instances: 1,
    watch: false,
    env:{
      "NODE_ENV":"development"
    },
    env_production: {
      "NODE_ENV": "production",
  },
    log_file:path.resolve(__dirname,'pm2log/log.log'),
    error_file:path.resolve(__dirname,'pm2log/error.log'),
    out_file:path.resolve(__dirname,'pm2log/out.log')
  }]
};
