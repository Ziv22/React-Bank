const api       = require("./routes/api"),
    express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    app         = express(),
    port        = 3100

    
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TransactionsDB', { useNewUrlParser: true })
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})