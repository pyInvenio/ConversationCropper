import { S3 } from 'aws-sdk';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

import fetch from 'node-fetch'
import FormData from 'form-data';

export const POST = async ({ request }) => {
  const s3 = new S3({
    accessKeyId: 'AKIAQNUM47BXT4XROADT',
    secretAccessKey: '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',
    region: 'us-east-1',
  });

  const params = {
    Bucket: 'phonecalls-05272023',
    Key: `audio/conversation.m4a`,
  };

  try {
    const file = fs.createWriteStream('static/conversation.m4a');
    const s3Stream = s3.getObject(params).createReadStream();

    await promisify(pipeline)(s3Stream, file);
    console.log('Done.');

    const testfile = fs.createReadStream('static/conversation.m4a');
    const data = new FormData();
    data.append("file", testfile);
    data.append("model", "whisper-1");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer [KEY]`,
      },
    });
    
    const json = await response.json();
    return new Response(JSON.stringify(json), { status: 200 });
  } catch (error) {
    return new Response("" + error, { status: 500 });
  }
}