//Database
const { MongooseDocument } = require('mongoose');
const mongoose = require('mongoose');
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected successfully"));

const articleSchema = new mongoose.Schema({

    type: String,
    title: String,
    descrition: String,
    credits:{
     forcaption: String,
    forposter: String
   },
    hashtags: String,
    date: String
  });

// artilce = arkafacts

const arkaEventSchema = new mongoose.Schema({

  type: String,
  title: String,
  descrition: String,
  hashtags: String,
  date: String
});

const arkaActivitySchema = new mongoose.Schema({

  type: String,
  title: String,
  descrition: String,
  hashtags: String,
  date: String
});

const arkaNewsSchema = new mongoose.Schema({

  type: String,
  title: String,
  descrition: String,
  hashtags: String,
  date: String
});
  
  const imageSchema = new mongoose.Schema({
    title: String,    // Name
    type: String,
    filename:{
      type:String,
      unique:true,
      required: true
    },
    contentType:{
      type:String,
      required: true
    },
    imageBase64:{
      type:String,
      required: true
    }
  });

  const memberSchema = new mongoose.Schema({
  
    name:String,
    year: String,
    branch: String,
    links:{
      phone: String,
      github: String,
      linkedln: String,
      email: String
   }
 
  });

 

const userSchema = new mongoose.Schema({
  
    email: String,
    password: String,
    googleId: String
  
  });


const Article = mongoose.model("Article",articleSchema);
const Image = mongoose.model("Image",imageSchema);
const Member = mongoose.model("Member",memberSchema);
const User = mongoose.model("User",userSchema);
const ArkaEvent = mongoose.model("ArkaEvent",arkaEventSchema);
const ArkaActivity = mongoose.model("ArkaActivity",arkaActivitySchema);
const ArkaNews = mongoose.model("ArkaNews",arkaNewsSchema);



module.exports = {
    Article: Article,
    Image: Image,
    Member: Member,
    User: User,
    ArkaEvent: ArkaEvent,
    ArkaActivity: ArkaActivity,
    ArkaNews: ArkaNews,
  }

  