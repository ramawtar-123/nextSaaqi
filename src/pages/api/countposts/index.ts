
import dbConnect from '../../../../utils/dbConnect';
import Posts from '../../../../models/Post';

dbConnect();
export default async function handler(req, res) {
    await dbConnect();
  
    try {
      const count = await Posts.countDocuments();
      res.status(200).json({ success: true, count });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }