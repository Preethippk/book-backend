  const PORT = process.env.PORT || 3000;
let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');


mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log('Database connected Successfully!!')
},
    error => {
        console.log('Database error:' + error)
    }
)
const bookRoute = require("./routes/book.routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));
app.use('/api', bookRoute);
const port = process.env.port || 8000;
app.listen(port, () => (
    console.log('Listening Port on:' + port)

))
app.use((req,res,next)=>{
    next(createError(404));
});
app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));
});
app.use(function(err,req,res,next){
    console.log(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
    
});

app.listen(PORT,()=>(
    console.log("server is running")

));
   

   