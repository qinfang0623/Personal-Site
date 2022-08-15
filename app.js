
const express = require("express");
const app = express();
app.use(express.static("public"));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Port gets started.");
});

// heroku login
// heroku git:remote -a <YOUR PROJECT NAME>
// git push -f heroku master
