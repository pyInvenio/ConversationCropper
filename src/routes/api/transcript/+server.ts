import { S3 } from 'aws-sdk';

export const POST = async ({ request }) => {
  const rec = await request.formData();
  const file = rec.get('file');

  const s3 = new S3({
    accessKeyId: 'AKIAQNUM47BXT4XROADT',
    secretAccessKey: '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',
    region: 'us-east-1',
  });

  const params = {
    Bucket: 'phonecalls-05272023',
    Key: `audio/${file.name}`,
    Body: Buffer.from(await file.arrayBuffer()),
  };

  try {
    await s3.upload(params).promise();

    return new Response('File uploaded successfully', { status: 200 });
  } catch (error) {
    return new Response("" + error, { status: 500 });
  }
};
