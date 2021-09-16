//Headers

// http://localhost:3000/
// https://git.heroku.com/shrouded-harbor-77455.git
// https://shrouded-harbor-77455.herokuapp.com/

//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const path  = require("path");

//Image upload
const multer = require("multer");
var store = require("multer");
//var tore = require("multer");
const fs = require('fs');
//const gs = require('fs');
//Image upload

const _ = require("lodash");
const app = express();

const {Article} = require(__dirname + "/mongoose.js");
const {Image} = require(__dirname + "/mongoose.js");
const {Member} = require(__dirname + "/mongoose.js");
const {User} = require(__dirname + "/mongoose.js");
const {ArkaEvent} = require(__dirname + "/mongoose.js");
const {ArkaActivity} = require(__dirname + "/mongoose.js");
const {ArkaNews} = require(__dirname + "/mongoose.js");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true,}));

//Image upload

var storage = multer.diskStorage({
  destination: function(req,file,callback){
    callback(null,"uploads");
  },
  filename: function(req,file,callback){
    var ext = file.originalname.substr(file.originalname.lastIndexOf("."));

    callback(null,file.fieldname+"-"+Date.now()+ext);
  }
});

store = multer({storage:storage});

//Constant Delaration

const about = "The Astronomy Club of IIT(ISM) Dhanbad is a platform for all those who have ever looked into the night sky, awe at its magnificence and stuck with its mysteries."+
" This website is an interactive platform for all those minds which have ever rose the question how, when, where and why on looking into vastness and grandeur of the cosmos with a vision of solving the mysteries lurking in it and increasing public awareness and understanding of science and astronomy.";
const customListName = "abcd";
const storedtitle = "abcd";

const ArkaFacts = "ArkaFacts";
const ArkaEvents = "ArkaEvents";
const ArkaActivites = "ArkaActivites";
const Arkanews = "ArkaNews";


//Get,Post functions


app.get("/",function(req,res){

  Image.find({},function(error,foundImages){
    Article.find({},function(err,foundArticle){
      ArkaEvent.find({},function(err,foundevents){
        ArkaActivity.find({},function(err,foundactivities){
          ArkaNews.find({},function(err,foundnews){
            res.render("home",
            {articlelist:foundArticle,
              imageslist:foundImages,
              aboutDescription: about,
              arkaevent:foundevents,
              arkaactivity:foundactivities,
              arkanews:foundnews
            });

                  });
                });
              });
           });
       });
});

// 

app.get("/members", function (req, res) {

  Image.find({},function(error,foundImages){
    Member.find({},function(err,foundMembers){
      res.render("members", {memberlist:foundMembers,imageslist:foundImages});
  
         });
  });
   
});

app.post("/members", function (req, res) {

});


app.get("/memberscreate", function (req, res) {
  res.render("memberscreate");

});


app.post("/memberscreate",function(req,res){
  //console.log(req.body);
  Member.findOne({name:req.body.name },function(err,foundMember){
    if(!err){
      if(!foundMember){
        const member = new Member({
          name: req.body.name,
          year: req.body. year,
          branch: req.body.branch,
          links:{
            phone: req.body.phone,
            github: req.body.github,
            linkedln: req.body.linkedln,
            email: req.body.email
          }
      
      });
        member.save();
        res.redirect("/members");
      }
    }
  });


});




app.get("/articles", function (req, res) {
  Image.find({},function(error,foundImages){
    Article.find({},function(err,foundArticle){
      res.render("articles", {articlelist:foundArticle,imageslist:foundImages});
  
         });

       });
  });

app.get("/arkaevent", function (req, res) {
    Image.find({},function(error,foundImages){
      ArkaEvent.find({},function(err,foundevents){
        res.render("arkaevent", {eventlist:foundevents,imageslist:foundImages});
    
           });
  
         });
    });

 app.get("/arkanews", function (req, res) {
      Image.find({},function(error,foundImages){
        ArkaNews.find({},function(err,foundnews){
          res.render("arkanews", {newslist:foundnews,imageslist:foundImages});
      
             });
    
           });
      });


 app.get("/arkaactivity", function (req, res) {
        Image.find({},function(error,foundImages){
          ArkaActivity.find({},function(err,foundactivity){
            res.render("arkaactivity", {activitylist:foundactivity,imageslist:foundImages});
        
               });
      
             });
        });

 app.get("/admin", function (req, res) {
          res.render("admin");
        
        });
app.get("/articlecreate",function(req,res){

   res.render("articlecreate");

});

app.post("/articlecreate",function(req,res){
  
 // console.log(req.body);
  if (req.body.type == ArkaFacts){
    Article.findOne({title:req.body.articlename },function(err,foundArticle){
      if(!err){
        if(!foundArticle){
          const article = new Article({
            type: req.body.type,
            title: req.body.articlename,
            descrition: req.body.description,
            credits:{
            forcaption: req.body.caption,
            forposter: req.body.poster
            },
            hashtags: req.body.hashtags,
            date: req.body.date
        });
          article.save();
          res.redirect("/articles");
        }
      }
    });
  }

  if (req.body.type == ArkaActivites){
    ArkaActivity.findOne({title:req.body.articlename },function(err,foundArticle){
      if(!err){
        if(!foundArticle){
          const arkaactivity = new ArkaActivity({
            type: req.body.type,
            title: req.body.articlename,
            descrition: req.body.description,
            hashtags: req.body.hashtags,
            date: req.body.date
        });
           arkaactivity.save();
          //res.redirect("/arkaevents");
        }
      }
    });
  }

  if (req.body.type == ArkaEvents){
    ArkaEvent.findOne({title:req.body.articlename },function(err,foundArticle){
      if(!err){
        if(!foundArticle){
          const arkaevent = new ArkaEvent({
            type: req.body.type,
            title: req.body.articlename,
            descrition: req.body.description,
            hashtags: req.body.hashtags,
            date: req.body.date
        });
          arkaevent.save();
          //res.redirect("/arkaevents");
        }
      }
    });
  }


  if (req.body.type == Arkanews){
    ArkaNews.findOne({title:req.body.articlename },function(err,foundArticle){
      if(!err){
        if(!foundArticle){
          const arkanews = new ArkaNews({
            type: req.body.type,
            title: req.body.articlename,
            descrition: req.body.description,
            hashtags: req.body.hashtags,
            date: req.body.date
        });
          arkanews.save();
          //res.redirect("/arkaevents");
        }
      }
    });
  }


});

//Image upload
app.get("/uploadmultiple",store.array("images",6),function(req,res,next){
  console.log(req.body)
});

app.post("/uploadmultiple",store.array("images",6),function(req,res,next){
  const files = req.files;

  if(!files){
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  //convert images into base64 encoding
  let imgArray = files.map((file) =>{
  let img = fs.readFileSync(file.path);

    return encode_image = img.toString('base64'); 
  });

   let result = imgArray.map((src,index)=>{
    //Create object to store data in collection
    let finalimg = new Image({
      type: req.body.type,
      title: req.body.articlename,
      filename: files[index].originalname,
      contentType : files[index].mimetype,
      imageBase64: src

    });

    return finalimg.save().then(function(){
      return {msg : files[index].originalname + " Uploaded Successfuly"};
    }).catch(function(error){
      if(error){
        if(error.name === "MongoError" && error.code === 11000){
          return Promise.reject({
            error: "Duplicate " + files[index].originalname +"File Already exists!" 
          });
        }
        return Promise.reject({
          error: error.message|| "Cannot Upload " + files[index].originalname +"something missing"
        })
        }

    })


  });

  Promise.all(result).then(msg => {
    //res.json(msg);
    console.log(msg);
    res.redirect("/articlecreate");
  })
  .catch(err =>{
    console.log(err);
  });
  //console.log(result);

});

//Image upload

//Express Route Parameters
app.get("/:customListName" , function(req,res){
  //console.log(req);
  const customListName = _.lowerCase(req.params.customListName);

  Image.find({},function(error,foundImages){
    Article.find({},function(err,foundArticle){

    
      foundArticle.forEach(function(post){
        const storedtitle = _.lowerCase(post.title);
        if(storedtitle == customListName){
          res.render("articlesdetails", {atitle: post.title ,
            adescription: post.descrition,ahashtag: post.hashtags,
            aforcaption: post.credits.forcaption,
            aforposter: post.credits.forposter,imageslist:foundImages
           });
        }
      });
  })
  }); 
});

app.post("/:customListName" , function(req,res){
  const customListName = _.lowerCase(req.params.customListName);
  
  res.redirect("/"+customListName);
 
});

//Get,Post functions

app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port 3000");
});
