import { S3 } from 'aws-sdk';

export function POST(request) {

  const { file } = request.body;

  // Check if the request body contains a file
  if (!file) {
    return {
      status: 400,
      body: 'No file provided',
    };
  }

  const s3 = new S3({
    accessKeyId: 'AKIAQNUM47BXT4XROADT',
    secretAccessKey: 'hAqjiUJHAuDW9Fngf+dUlPTLC41HgCwSp+cZ+zKnYOUR_SECRET_ACCESS_KEY',
    region: 'us-east-1',
  });

  const params = {
    Bucket: 'phonecalls',
    Key: `path/to/destination/${file.name}`,
    Body: file.stream,
  };

  try {
    await s3.upload(params).promise();

    return {
      status: 200,
      body: 'File uploaded successfully',
    };
  } catch (error) {
    return {
      status: 500,
      body: 'An error occurred during file upload',
    };
  }
}
