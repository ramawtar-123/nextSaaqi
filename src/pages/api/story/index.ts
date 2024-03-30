import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import secretkey from "../../../../config"
import User from '../../../../models/User';
import Post from '../../../../models/Post';
import { MongoClient } from 'mongodb';
import { decode } from 'punycode';
import Story from '../../../../models/Story'
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

const ensureUploadDirExists = () => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  };

export const config = {
api: {
    bodyParser: false,
},
};

const client = new MongoClient("mongodb://localhost:27017/")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    ensureUploadDirExists();

    const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data.' });
      return;
    }

    const file = files.file as formidable.File;
    const oldPath = file.path;
    const newPath = path.join(uploadDir, file.name);

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('Error moving uploaded file:', err);
          res.status(500).json({ error: 'Error moving uploaded file.' });
        } else {
          res.status(200).json({ success: true });
        }
      });
    });

    // if(req.method === 'POST'){
    //     const token = req.cookies.token;
    //     if(!token){
    //         return res.json(401).json({ message: 'Unauthorized' });
    //     }

    //     const decodedToken = jwt.verify(token, secretkey);
    //     const userId = decodedToken.id;

    //     const { content } = req.body;

    //     try{
    //         const user = await User.findById(userId);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         const story = await Story.create({
    //             story: content,
    //             user: userId
    //         })

    //         const populatedUser = await Story.findById(story._id).populate('user')

    //         user.stories.push(story._id);
    //         await user.save();
    //         res.status(201).json({ message: 'Post created successfully', post: populatedPost });
    //     } catch (error) {
    //       console.error('Error creating post:', error);
    //       res.status(500).json({ message: 'Internal Server Error' });
    //     }
    //   } else {
    //     res.status(405).json({ message: 'Method Not Allowed' });
    //   }
}
