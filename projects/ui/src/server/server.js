const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


// endpoint proxies
///////////////////////////////////////
app.get('/api/test', (req, res) => {
  res.json('here is some data');
});

app.get('/api/hello', (req, res) => {
    returnDataFromFile(res, 'data/hello.json', (data) => {
        // callback function to manipulate data from querystring etc
        return data;
    });
  });


// functions
///////////////////////////////////////
function returnDataFromFile(res, path, callback) {
    fs.readFile(__dirname + '/' + path, (error, data) => {
        if (error) {
            res.statusCode = 400;
            res.send(error);
        } else {
            try {
                const dataJson = JSON.parse(data);
                res.json(callback(dataJson));
            } catch (error) {
                res.statusCode = 400;
                res.send(error);
            }
        }
    });
}


// start the server
///////////////////////////////////////
app.listen(3410, () => console.log('Mock data service lives!'));
