// middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import secretkey from '../config';

const secretKey = secretkey;

export const requireAuthentication = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.cookies.token;

      console.log(req.cookies);

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        return handler(req, res);
      });
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
