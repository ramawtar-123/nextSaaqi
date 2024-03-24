// pages/api/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { requireAuthentication } from '../../../middleware/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Welcome to the protected route!' });
};

export default requireAuthentication(handler);
