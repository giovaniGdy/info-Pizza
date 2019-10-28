const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const methodOverride = require("method-override")
const axios = require('axios')

// aaaa
var cors = require('cors')

app.use(cors({origin: '*'}));
// aaaa

app.set("view engine", "ejs")

app.use( express.static( "public" ) )
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressValidator())

require('./routes/site')(app)

require('./routes/login')(app)

require('./routes/pedidos')(app)

require('./routes/cardapio')(app)

require('./routes/feed')(app)

module.exports = app
