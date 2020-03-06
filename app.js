const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const methodOverride = require("method-override")
var img = require('path').join(__dirname,'./public/')

var cors = require('cors')
app.use(cors({origin: '*'}));

app.use(express.static( img ) )
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(expressValidator())

require('./routes/site')(app)

require('./routes/login')(app)

require('./routes/pedidos')(app)

require('./routes/cardapio')(app)

require('./routes/feed')(app)

module.exports = app
