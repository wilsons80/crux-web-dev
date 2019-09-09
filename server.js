//Install express server
const express = require('express');
const path = require('path');

const app = express();

/*
const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
}
app.use(forceSSL());
*/

// Serve only the static files form the dist directory
app.use(express.static(__dirname,'./dist/crux-web-dev'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/crux-web-dev/index.html'));
});

// Start the app by listening on the default Heroku port
console.log('Rodando aplicação na porta: ', process.env.PORT);
app.listen(process.env.PORT || 3000);
