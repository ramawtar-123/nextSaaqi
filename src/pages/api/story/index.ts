// pages/api/story/index.js

import AWS from 'aws-sdk';
import mongoose from 'mongoose';
import Story from '../../../../models/Story';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import multer from 'multer'

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ dest: 'uploads/' });

AWS.config.update({
  accessKeyId: 'AKIAX6YJWN7CGSPJWC4R',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();



const uploadToS3 = async (req) => {
    console.log(req.file.buffer);
  const params = {
    Bucket: 'saaqibucketdb',
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'private',
  };

  try {
    const response = await s3.upload(params).promise();
    console.log('File uploaded successfully:', response.Location);
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    try {

      upload.single('file')(req, res, async (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).json({ success: false, error: 'Error uploading file' });
        }

      const uploadedFileUrl = await uploadToS3(req);

      const newStory = new Story({
        story: uploadedFileUrl,

      });
      await newStory.save();
      console.log(req.body);

      res.status(201).json({ success: true, uploadedFileUrl, log: req.body });
    });
    } catch (error) {
      console.error('Error handling file upload:', error);
      res.status(500).json({ success: false, error: 'Error handling file upload' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}
 