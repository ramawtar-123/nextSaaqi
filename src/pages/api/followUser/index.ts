// pages/api/followUser.js

import User from '../../../../models/User'; // Import the User model

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { userId, followUserId } = req.body;

    // Find the current user by userId
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user to follow by followUserId
    const userToFollow = await User.findById(followUserId);
    if (!userToFollow) {
      return res.status(404).json({ message: 'User to follow not found' });
    }

    console.log(userToFollow)

    // Check if the current user is already following the user to follow
    if (currentUser.followings.includes(followUserId)) {
      return res.status(400).json({ message: 'User already followed' });
    }

    // Add the user to follow's ID to the current user's followings list
    currentUser.followings.push(followUserId);
    await currentUser.save();

    // Add the current user's ID to the user to follow's followers list
    userToFollow.followers.push(userId);
    await userToFollow.save();

    return res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error following user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
