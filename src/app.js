import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import hbs  from 'express-handlebars';
import path  from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import flash from 'express-flash-2';



import api from './infrastructure/routes/api.routes';
import admin from './infrastructure/routes/admin.routes';
import login from './infrastructure/routes/login.routes';
import apiResponseHelper from './infrastructure/middlewares/api-response-helper';
import helperTeste from './infrastructure/helpers/helpers-handlebars.js';

dotenv.load();
const app = express();

const environment = process.env.NODE_ENV || 'development';

app.engine('hbs', hbs({
  partialsDir: path.join(__dirname, '/resources/views/partials'),
  layoutsDir: path.join(__dirname, '/resources/views/layouts'),
  extname: '.hbs',
  helpers: helperTeste,
  defaultLayout: 'layout',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views/'));
app.use('/public', express.static(path.resolve('public')));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'))

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/sdg-confession', {
  useNewUrlParser: true
})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

const db = mongoose.connection;
const MongoStore = connectMongo(session);

app.use(cookieParser());
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(flash());
app.use(bodyParser.json());
app.use(apiResponseHelper);
app.use('/api/', api);
app.use('/', login);
app.use('/admin', admin);

app.listen(3000, async() => {
  console.log('Server listening on port: 127.0.0.1:3000');
  console.log(`ENV: ${app.get('env')}`);
});