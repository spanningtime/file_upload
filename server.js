/*Define dependencies.*/

var express = require('express');
var multer = require('multer');
var app = express();
var parseString = require('xml2js').parseString
const util = require('util');

/*Configure the multer.*/

var upload = multer({ storage });
var storage = multer({inMemory: true})
/*Handling routes.*/

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/upload', upload.single('songlist'), (req,res) => {
  const buf = req.file.buffer;
  const str = buf.toString('utf8')
  const tracksArray = [];
  parseString(str, (err, result) => {
    const tracks = result.plist.dict[0].dict[0].dict;
    for (track of tracks) {
      trackObj = {}
      trackObj.title = track.string[0];
      trackObj.artist = track.string[1];
      tracksArray.push(trackObj);
    }

  });

  res.status(204).end();
});

/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});
