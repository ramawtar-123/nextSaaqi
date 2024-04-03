import dbConnect from '../../../../utils/dbConnect';
import Post from '../../../../models/Post'; 


// Connect to the database
dbConnect();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }



  try {
    // Fetch 10 random documents from the 'posts' collection
    // const randomPosts = await Post.aggregate([{ $sample: { size: 10 } }]).populate('user');

    const randomPosts = await Post.aggregate([
        { $sample: { size: 10 } },
        { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' } // If user field is an array, unwind it to get individual documents
      ]);


    res.status(200).json(randomPosts);
  } catch (error) {
    console.error('Error fetching random posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
