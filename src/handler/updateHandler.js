const get = require('lodash/get');
const AWS = require('aws-sdk');

const BUCKET_NAME = 'moveme-iknowcss';
const OBJECT_KEY = 'moveme-lambda.zip';
const FUNCTION_NAME = 'moveMe';

const lambda = new AWS.Lambda();

module.exports = function (event, context) {
  const s3 = get(event, 'Records[0].s3');
  const objectKey = get(s3, 'object.key');
  const bucketName = get(s3, 'bucket.name');
  const versionId = get(s3, 'object.versionId');

  if (bucketName == BUCKET_NAME && objectKey == OBJECT_KEY && versionId) {
    const params = {
      FunctionName: FUNCTION_NAME,
      S3Key: objectKey,
      S3Bucket: bucketName,
      S3ObjectVersion: versionId
    };

    console.info('Update lambda function code from S3:', params);

    lambda.updateFunctionCode(params, function (err, data) {
      if (err) {
        console.error('Update FAILED:', err.stack);
        context.fail(err);
      } else {
        console.info('Update successful');
        context.succeed(data);
      }
    });
  } else {
    context.succeed(
      'Skip object "' + objectKey + '" ' +
      'in bucket "' + bucketName + '" ' +
      'with version "' + versionId + '"'
    );
  }
};