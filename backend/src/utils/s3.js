const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');
const path = require('path');
const env = require('../config/env');

let s3Client = null;

function getS3Client() {
  if (s3Client) return s3Client;
  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_S3_BUCKET) {
    return null;
  }
  s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });
  return s3Client;
}

async function generateUploadUrl({ folder, filename, contentType }) {
  const client = getS3Client();
  if (!client) {
    throw new Error(
      'AWS S3 is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_S3_BUCKET in .env'
    );
  }

  const ext = path.extname(filename) || '';
  const uniqueName = `${crypto.randomUUID()}${ext}`;
  const key = `${folder}/${uniqueName}`;

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType || 'video/mp4',
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  const fileUrl = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

  return { uploadUrl, fileUrl, key };
}

async function generateDownloadUrl(key, expiresIn = 600) {
  const client = getS3Client();
  if (!client) {
    return null;
  }

  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn });
}

function extractS3Key(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
  } catch {
    return null;
  }
}

module.exports = { generateUploadUrl, generateDownloadUrl, extractS3Key };
