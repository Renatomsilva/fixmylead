const express = require('express')
    ,app = express()
    ,bodyParser = require('body-parser')
    ,http = require('http')
    ,nconf = require('nconf')
    ,cookieParser = require('cookie-parser')
    ,compression = require('compression')
    ,path = require('path')
    ,helmet = require('helmet')
    ,session = require('express-session')
    ,cluster = require('cluster')
    ,hidePoweredBy = require('hide-powered-by')
    ,logger = require('winston')
    ,cors = require('cors');

const indexRoute = require('./app/routes/index');
const oficina = require('./app/routes/oficina');


require('dotenv').load({ silent: true });

nconf.use('memory');

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./public'));


//ROTAS
indexRoute(app);
oficina(app);

app.listen(process.env.PORT || 4000, function () {
    logger.info("app funcionando");
});

