import { S3 } from 'aws-sdk';
import {AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_ACCESS_KEY} from '$lib/server/config.js';

export const POST = async ({ request }) => {
  const rec = await request.formData();
  const file = rec.get('file');

  const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  const params = {
    Bucket: 'phonecalls-05272023',
    Key: `audio/${file.name}`,
    Body: Buffer.from(await file.arrayBuffer()),
  };

  try {
    await s3.upload(params).promise();
    let url = `https://phonecalls-05272023.s3.amazonaws.com/audio/${file.name}`;
    let json  = JSON.stringify({url: url});
    return new Response(json, { status: 200 });
  } catch (error) {
    return new Response("" + error, { status: 500 });
  }
};
