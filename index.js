const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { exec } = require('child_process');
const SERVER_PORT = 8888
const S3_ENDPONT = 'nyc3.digitaloceanspaces.com'

const app = express();

const spacesEndpoint = new aws.Endpoint(S3_ENDPONT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
    cb(null, `${uuidv4()}.${ext}`)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

// Views in public directory
app.use(express.static('static'));


app.post('/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    return res.json({
      error: true,
      error_description: 'File was not uploaded'
    })
  }
  const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
  const newFilePath =
    exec(`backgroundremover -i "${req.file}" -o "./uploads/${uuidv4()}.${ext}"`, (err, stdout, stderr) => {
      if (err) {
        return res.json({
          error: true,
          error_description: 'Could not remove bg!',
          error_trace: err
        })
      }
      return res.json({
        success: true,
        images: {
          original: req.file.path,
          formatted: `./uploads/${uuidv4()}.${ext}`
        }
      })
    })
});

app.listen(SERVER_PORT, () => {
  console.log(`server is up on ${SERVER_PORT}`)
})