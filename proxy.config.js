
//Capturando a porta do Heroku
const PORTA = process.env.PORT || 8080;

//TODO rever essa linha em produção
const targetDomain = `http://localhost:${PORTA}`;

//const targetDomain = process.env.PROXY_TARGET_DOMAIN ? `https://${process.env.PROXY_TARGET_DOMAIN}.mpdft.mp.br` : 'http://localhost:8080';
console.log(`Usando o endereço "${targetDomain}" para o proxy...\n`);

const PROXY_CONFIG = {
  "/api": {
    "target": targetDomain,
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": "true"
  },
};

module.exports = PROXY_CONFIG;
