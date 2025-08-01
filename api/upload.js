import { Blob } from '@vercel/blob';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // formidable doet zelf de parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form' });
      return;
    }

    if (!files.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const file = files.file;

    try {
      // Blob container & token via env variables instellen
      const blob = new Blob({
        account: process.env.VERCEL_BLOB_ACCOUNT,
        container: process.env.VERCEL_BLOB_CONTAINER,
        token: process.env.VERCEL_BLOB_TOKEN,
      });

      // Upload het bestand
      const uploadResponse = await blob.uploadFile({
        name: file.originalFilename,
        stream: file.filepath ? fs.createReadStream(file.filepath) : null,
        size: file.size,
        type: file.mimetype,
      });

      res.status(200).json({ url: uploadResponse.url });
    } catch (uploadError) {
      console.error(uploadError);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
}
