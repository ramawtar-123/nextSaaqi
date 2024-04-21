
import User from '../../../../models/User'; 

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Error finding user by email:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
