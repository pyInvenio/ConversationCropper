import { S3 } from 'aws-sdk';
import { Configuration, OpenAIApi } from 'openai';
import { Readable } from 'stream';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export const POST = async ({request}) => {
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
    const file = await s3.getObject(params).promise();
    const data = file.Body?.toString('utf-8');
    const transcription = openai.createTranscription(data, 'whisper-1');

    return new Response('File read successfully', { status: 200 });
  } catch (error) {
    return new Response("" + error, { status: 500 });
  }
}
