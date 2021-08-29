const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const SERVER_PORT = 8888
const S3_ENDPONT = 'nyc3.digitaloceanspaces.com'

const app = express();

const spacesEndpoint = new aws.Endpoint(S3_ENDPONT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'portraits',
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, file.originalname);
    }
  })
}).array('upload', 1);

// Views in public directory
app.use(express.static('static'));


app.post('/upload', function (request, response, next) {
  upload(request, response, function (error) {
    if (error) {
      return response.json({
        error: true,
        error_stack: error
      })
    }
    console.log('File uploaded successfully.');
    response.redirect("/success");
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`server is up on ${SERVER_PORT}`)
})