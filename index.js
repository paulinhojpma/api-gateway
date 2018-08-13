//index.js
var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
var path = require('path');
var User   = require('./user'); 
var jwt = require('jsonwebtoken');
const userServiceProxy = httpProxy('http://localhost:8080');
var mongoose    = require('mongoose');
var multer = require('multer'); 
var upload = multer();
var bodyParser  = require('body-parser');
var config = require('./config'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(config.database , { useNewUrlParser: true }); 
console.log("Global Promise - "+ global.Promise);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//pagina inicial
app.get("/", function(req, res, next){
    console.log("Entrou no index");
    res.setHeader('Content-Type', 'text/html');
    res.render("index", {title: "Login"});
});

//função para logar
app.post("/logar", function (req, res, next){
  console.log("Entrou no logar");
  console.log("Valor do login - "+ req.body.login);
  console.log("Latitude - "+ req.body.latitude+ "\nlongitude = "+ req.body.longitude);

  User.findOne({
	      login: req.body.login},
	      function(err, user){
	        if (err) throw err;
	        if(!user){
	        	console.log("Não achou o usuario");
	          res.json({ success: false, message: 'Usuário não encontrado.'});

	        }else if(user){
	         	console.log("usuario - "+ user.login);
	          if(user.senha != req.body.senha){

	            res.json({ success: false, message: 'Senha errada.' });

	          }else{

	             const payload = {
	              email: user.email
	          	};

	             // console.log("Segredo - "+ process.env.SECRET);
	              var token = jwt.sign(payload, config.secret, {
	                  expiresIn: 300 // expires in 24 hours
	               });

	              res.json({
	                success: true,
	                message: 'Logado com sucesso',
	                token: token
	              });
	          }
	        }
	      }
	    );

	});
//autenticar o usuario
var autenticar = function autenticar(req, res, next){
   console.log("Entrou no autenticar");
    var token = req.body.token || req.headers['x-access-token'];
    console.log("token - "+ token);
    if(token){
      jwt.verify(token, config.secret, function(err, decoded){
        if(err){
          console.log(err);
          return res.json({ success: false, message: 'Erro ao autenticar' })
        }else{
          console.log("Decoded - "+ decoded);
          req.decode = decoded;
          next();
        }
      });
    }else{
      return res.status(403).send({ 
        success: false, 
        message: 'Nenhum token dado' 
      });
      //res.render('index');
    }
    
}
// Proxy request
app.get('/users', autenticar, (req, res, next) => {
  userServiceProxy(req, res, next);
});

/*app.get('/products', (req, res, next) => {
  productsServiceProxy(req, res, next);
})*/
app.engine('html', require('ejs').renderFile);
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 8100; 

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log("Servidor rodando na porta: "+ port)
var server = http.createServer(app);
server.listen(port);