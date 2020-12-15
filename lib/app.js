const express =  require('express');
const app = express();
app.use(express.json());


app.post('./api/v1/artists', (req, res, next) => {

});

app.get('./api/v1/artists/:id', (req, res, next) => {
  const id = req.params.id;
});

app.get('./api/v1/artists', (req, res, next) => {

});

app.put('./api/v1/artists/:id', (req, res, next) => {
  const id = req.params.id;
});

app.delete('./api/v1/artists/:id', (req, res, next) => {
  const id = req.params.id;
});



app.post('./api/v1/albums', (req, res, next) => {

});

app.get('./api/v1/albums/:id', (req, res, next) => {
  const id = req.params.id;
});

app.get('./api/v1/albums', (req, res, next) => {

});

app.put('./api/v1/albums/:id', (req, res, next) => {
  const id = req.params.id;
});

app.delete('./api/v1/albums/:id', (req, res, next) => {
  const id = req.params.id;
});





module.exports = app;
