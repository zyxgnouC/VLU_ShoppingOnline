const express = require('express')
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/home`);
});

// import AccountModel
const CustomerSchema  = require('./models/Models.js')
// const path = require('path')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));



// app.use('/public', express.static(path.join( '/public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})


// apis
app.use('/api/admin', require('./api/admin.js'));
// apis
app.use('/api/customer', require('./api/customer.js'));

// deployment
const path = require('path');
// '/admin' serve the files at client-admin/build/* as static files
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'))
});
// '/' serve the files at client-customer/build/* as static files
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});
