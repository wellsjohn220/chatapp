const express = require('express')
var bodyParser = require('body-parser')

const app = express()
var http = require('http').Server(app)
//var io = require('socket.io')(http)
var mongoose = require('mongoose')
const { send } = require('process')

const port = process.env.PORT || 3010

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//mongodb+srv://wellsjohn:Sh268268@cluster0.i0dtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
var dbUrl = 'mongodb+srv://Admin:Sh268268@sandbox.zniqw.mongodb.net/chatapp?retryWrites=true&w=majority'
var Message = mongoose.model('Message', {
    name : String, message: String
})
// var messages = [
//     {name: "John", message: "Hello from Sydney"},  {name: "Jane", message: "How are you"}, {name: "Rose", message: "Nice to see you"}
// ]
app.get('/messages', (req, res) => {
    //res.send("Hello World!")
    //res.send(messages)
    Message.find({}, (err,messages) =>{
        res.send(messages)
    })
})
app.post('/messages', (req, res) => {
    var message = new Message(req.body)
    message.save((err) => {
        if(err)
            res.sendStatus(500)
      //  console.log(req.body)
      //  messages.push(req.body);
      //  io.emit('message', req.body)
        res.sendStatus(200);
      
    })    
})

//io.on('connection', (socket)=> {
//    console.log('user connected');
//})

mongoose.connect(dbUrl, (err) => {
    //if (err) return console.log(err);
    console.log('mongodb connection successful')
})
// mongoose.connect(dbUrl,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000   
// }).catch(err => console.log(err));

//app.listen(3010)

app.listen(port, () => {
    console.log('Server is listening on port ', port )
})

console.log('I am listening')