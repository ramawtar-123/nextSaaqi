import axios from 'axios';
import User from '../../../../models/User'


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {

    const { currentUserEmail } = req.query;
    console.log(currentUserEmail)

    const user = await axios.get(`/api/findUserByEmail?email=${currentUserEmail}`)
    console.log('USER: ',user)

    const users = await User.find().limit(3);


    return res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
