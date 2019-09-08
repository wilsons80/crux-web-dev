const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta: ${ PORT }`);
});

app.use(express.static(`$/dist/$`));
 
app.get('/*', (req, res) => {
res.sendFile(path.join(`$/dist/$/index.html`));
});
 
app.listen(process.env.PORT || 8080);