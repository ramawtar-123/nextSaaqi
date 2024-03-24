
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function parseCookies(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const cookies = cookie.parse(req.headers.cookie || '');

  // Attach parsed cookies to the request object
  req.cookies = cookies;

  next();
}
