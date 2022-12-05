const express = require("express");
const { type } = require("os");
const app = express();
const detabaseconnection = require("./dbconnection/connection")

const path = require("path");
const port = process.env.PORT || 5000;
require("dotenv").config({path:'./config.env'});

// we need to tell the server that we will recirvr deta in form of json from frontend
app.use(express.json());
const Content_Model = require("./Models/content");

// writing post api
app.post('/api/post', async (req, res) => {
    try {
        const { name, category, headline, description,email } = req.body;
        const new_post = new Content_Model({ name, category, headline, description,email });
        await new_post.save();
       
        res.json({ success: true, message: "your deta is saved in detabase" }) 
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, error: error.message });
    }
});
// api to get the deta
app.get('/api/getnews', async (req, res) => {
    try {
        const data =await Content_Model.find({category:"Latest_News"}).sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
});
app.get('/api/getblog', async (req, res) => {
    try {
        const data =await Content_Model.find({category:"Blog"}).sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
});
app.get('/api/jokes', async (req, res) => {
    try {
        const data =await Content_Model.find({category:"Jokes"}).sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
});
// code for hosting
 // note when you have to run on loacal then process.env.NODE_ENV !== "production"
 // for checking write in url http://localhost:5000/
 // when you are hosting then process.env.NODE_ENV === "production"
if (process.env.NODE_ENV === "production") {
  app.use(express.static("Client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/Client/build/index.html"),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}
detabaseconnection().then( ()=>
    {
   
        app.listen(port, () => { console.log(`Server is running at ${port} port`) })
    }

);



















