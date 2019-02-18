import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import api from './infrastructure/routes/api.routes';
import apiResponseHelper from './infrastructure/middlewares/api-response-helper';

dotenv.load();
const app = express();

const environment = process.env.NODE_ENV || 'development';

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/sdg-confession', {
  useNewUrlParser: true
})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));


app.use(bodyParser.json());
app.use(apiResponseHelper);
app.use('/api/', api);

app.listen(3000, async() => {
  console.log('Server listening on port: 127.0.0.1:3000');
  console.log(`ENV: ${app.get('env')}`);
});