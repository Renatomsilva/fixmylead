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

process.env.DATABASE_HOST = "teste";
process.env.DATABASE_NAME = "teste";
process.env.DATABASE_PASSWORD = "teste";
process.env.CACHE_URL = "teste";
process.env.CACHE_PORT = "teste";
process.env.CACHE_PASSWORD = "teste";

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./public'));


//ROTAS
indexRoute(app);
oficina(app);

app.listen(process.env.PORT || 4000, function () {
    logger.info("app funcionando", process.env.NODE_ENV, process.env.PORT || 4000);
});

