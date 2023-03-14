const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const User = require("./models/user")
const Room = require('./models/room');

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())

app.get('/', (req, res) =>{
  res.status(200).send("Hello World")
})

app.get("/getData", (req, res) =>{
  res.send("Testing this on React");
});

//Rooms
app.get("/getallrooms", async (req, res) => {

  try {
    const rooms = await Room.find({})
    res.send(rooms)
  } catch (error) {
      return res.status(400).json({ messge: error });
  }
});

app.post("/getroombyid", async (req, res) => {

  const roomid = req.body.roomid

  try {
    const room = await Room.findByIdAndUpdate({_id : roomid})
    res.send(room)
  } catch (error) {
      return res.status(400).json({ messge: error });
  }
});

//Users
app.post("/register", async (req, res) => {

  const newuser = new User(req.body)

  try {
      const user = await newuser.save()
      res.send("User registed SuccessFully")
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.post("/login", async(req, res) =>{

  const {email , password} = req.body

  try {
    const user = User.findOne({email : email , password : password})
    if(user) {
      const temp = {
        name : user.name,
        email : user.email,
        admin : user.admin,
        _id : user._id,
      }
      res.send(temp)
    }
    else{
      return res.status(400).json({ message : 'login failed' });
    }
  } catch (error) {
      return res.status(400).json({ error });
  }
});

// Database
const Database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  mongoose.set('strictQuery', false);
  try {
    mongoose.connect(
      "mongodb+srv://marwan:xxq6ilScsLlMM8cZ@cluster0.avzd0kp.mongodb.net/accommodation?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to MongoDB");
  }
});

Database();

/*const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
   process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con =>{
  console.log(con.connections);
  console.log("Successfully connected to MongoDB");
})*/

const usersRoute = require('./routes/users-routes')
const roomsRoute = require('./routes/rooms-routes')
const studentsRoute = require('./routes/students-routes')

app.use('/api/users', usersRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/students', studentsRoute)

// Serve - https://stackoverflow.com/questions/4840879/nodejs-how-to-get-the-servers-port
app.listen(port, () => console.log(`app listening on port ${port}`));

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function () { process.exit() })

