//TODO rever essa linha em produção
//const targetDomain = process.env.PROXY_TARGET_DOMAIN ? `https://${process.env.PROXY_TARGET_DOMAIN}.mpdft.mp.br` : 'http://localhost:8080';
const targetDomain = 'http://localhost:8080';
console.log(`Usando o endereço "${targetDomain}" para o proxy...\n`);

const PROXY_CONFIG = {
  "/api": {
    "target": targetDomain,
    "secure": false,
    "pathRewrite": {
      "^/sistemas/java/neogab/api": ""
    },
    "changeOrigin": "true"
  },
};

module.exports = PROXY_CONFIG;
