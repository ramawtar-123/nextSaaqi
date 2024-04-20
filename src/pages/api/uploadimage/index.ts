
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import aws from 'aws-sdk';
import { S3 } from 'aws-sdk';
import User from '../../../../models/User'


const s3 = new S3({
    accessKeyId: 'AKIAX6YJWN7CGSPJWC4R',
    secretAccessKey: '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',
  });


const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  }),
});



export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
     upload.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        res.status(500).json({ error: 'An error occurred while uploading the file' });
      } else if (err) {
        console.error('Unknown error:', err);
        res.status(500).json({ error: 'An unknown error occurred' });
      } else {
        // File uploaded successfully

        // const uploadParams = {
        //     Bucket: "saaqibucketdb",
        //     Key: `${Date.now()}-${req.file.originalname}`,
        //     Body: req.file.buffer,
        //     ContentType: req.file.mimetype, 
        //   };
    
        //   const result = await s3.upload(uploadParams).promise();




        const user = await User.findById(req.body.user._id);
        user.profilePicture = req.file.filename;
        await user.save();


        console.log('File uploaded:', req.file);
        res.status(200).json({ message: 'File uploaded successfully' });
      }
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'An error occurred while handling file upload' });
  }
}
