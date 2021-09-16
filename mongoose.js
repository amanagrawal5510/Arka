//Database
const { MongooseDocument } = require('mongoose');
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://@cluster0.n1jec.mongodb.net/arkaDB" , {useNewUrlParser: true, useUnifiedTopology: true});
//Database
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


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

  