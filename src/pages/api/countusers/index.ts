
import User from '../../../../models/User'; 
import dbConnect from '../../../../utils/dbConnect';

dbConnect();
export default async function handler(req, res) {
    await dbConnect();
  
    try {
      const count = await User.countDocuments();
      res.status(200).json({ success: true, count });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }