import User from '../../../../models/User';
import dbConnect from '../../../../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const { userId } = req.query; // Assuming userId is passed as a query parameter

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Count the number of followers
    const followingCount = user.followings.length;

    res.status(200).json({ success: true, followingCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
