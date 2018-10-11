var express = require('express')
    , router = express.Router()
    , aws = require('aws-sdk')

  router.get('/', function(req, res) {
    res.render('index')
  })

  aws.config.loadFromPath('./aws-config.json');

  var S3_BUCKET = 'gmail-api-testing-almog'

  router.get('/sign', function(req, res) {

    var s3 = new aws.S3()
    var options = {
      Bucket: S3_BUCKET,
      Key: req.query.file_name,
      Expires: 3600,
      ContentType: req.query.file_type,
      ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', options, function(err, data){
      if(err) return res.send('Error with S3')

      res.json({
        signed_request: data,
        url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
      })
    })
  })

  module.exports = router
