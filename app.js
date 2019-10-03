const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const methodOverride = require("method-override")


app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressValidator())


require('./routes/pedidos')(app)

app.get("/", (req, res) => res.redirect("/pedidos"))

module.exports = app
