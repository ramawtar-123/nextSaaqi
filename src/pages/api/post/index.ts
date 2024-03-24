// pages/api/post.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import secretkey from "../../../../config"
import User from '../../../../models/User';
import Post from '../../../../models/Post';
import { MongoClient } from 'mongodb';


const client = new MongoClient("mongodb://localhost:27017/");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token, secretkey);
    const userId = decodedToken.id; 

    const { content } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const post = await Post.create({
        content,
        user: userId,
      });

  
      const populatedPost = await Post.findById(post._id).populate('user');

      user.posts.push(userId);
      await user.save();

      res.status(201).json({ message: 'Post created successfully', post: populatedPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
