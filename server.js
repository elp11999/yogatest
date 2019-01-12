var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var pg = require("pg");
var fs = require("fs");
var prep = require('pg-prepared');
var formidable = require('formidable');

var app = express();

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connectionString = "postgres://admin:OCS@vmmsh3.oc.com:5432/piquserdata";

const pool = new pg.Pool(
	{
		user: "admin",
		host: "vmmsh3.oc.com",
		database: "piquserdata",
		password: "OCS",
		port: "5432"
	}
);

app.get('/*.html', function (req, res) {
	console.log(req.url);
	
	fs.readFile("." + req.url, function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
 	});
})

app.post('/addImage', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
		var oldpath = files.image.path;
		var newpath = './images/' + files.image.name;
		fs.rename(oldpath, newpath, function (err) {
			if (err) 
				throw err;
			res.write('File uploaded and moved!');
			res.end();
		});
	});
	//res.json({ ok: true });
})

app.get('/images/*', function (req, res) {
	console.log(req.url);

	res.writeHead(200,{'content-type':'image/jpg'});
	fs.createReadStream("." + req.url).pipe(res);
})

app.post('/addUser', function (req, res) {
	var body = req.body;

	jsonData = JSON.stringify(body);
	
	console.log('json', body);
	console.log('json', jsonData);

	//var item = prep('insert into users (data) values($1), body);

	pool.query('insert into users (data) values($1)', [body], (qerr, qres) => {
	  if (qerr) {
		console.log('error: ', qerr);
	  }
	  console.log('qres: ', qres);
	  
	  res.json({ ok: true });
	});

   	// First read existing users.
	/*
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	  data = JSON.parse( data );
	  data["user4"] = user["user4"];
	  //console.log( data );
	  res.json({ ok: true });
	  res.end( JSON.stringify(data));
	});
	*/
})

app.get('/listUsers', function (req, res) {
  
  pool.query("select * from users", (qerr, qres) => {
	  if (qerr) {
        console.log('error: ', qerr);
	  }
      console.log('qres: ', qres);
	  
	  var sb = [""];
	  
	  for (i = 0; i < qres.rowCount; i++) {
		  console.log("id=" + qres.rows[i].id);
		  console.log("created_at=" + qres.rows[i].created_at);
		  jsonData = JSON.stringify(qres.rows[i].data);
		  console.log("data=" + jsonData);
		  sb.push(jsonData);
	  }
      res.end(sb.join("\n"));
  });
})

console.log("Server.js: has started...");

var server = app.listen(8081, function () {
   var host = server.address().address
   //host = "localhost";
   var port = server.address().port
   console.log("Server.js: listening at http://%s:%s", host, port)
})

/*

INSERT INTO users VALUES (1, '{
  "name": "msh",
  "password": "OCS",
  "profession": "Golfer",
  "id": 1
}
');

npm install express --save
npm install body-parser --save
npm install cookie-parser --save
npm install multer --save
npm install pg --save
npm install pg-prepared --save
npm install formidable --save

node server.js


https://gist.github.com/dogancelik/fb8cf8a61877070b0f70



curl --header "Content-Type: application/json" -d '{"user4" : {"name" : "mohit","password" : "password4","profession" : "teacher","id": 4}}' http://ocs1803.oc.com:8081/addUser

curl --header "Content-Type: application/json" -d '{"user" : "foo", "password" : "OCS", "profession" : "HR", "id": 3}' http://ocs1803.oc.com:8081/addUser

curl  http://ocs1803.oc.com:8081/listUsers


*/
