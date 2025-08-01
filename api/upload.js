import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Alleen POST toegestaan' });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Parse error' });

    const file = files.file;
    if (!file) return res.status(400).json({ error: 'Geen bestand gevonden' });

    try {
      const stream = fs.createReadStream(file.filepath);
      const { url } = await put(file.originalFilename, stream, {
        access: 'public'
      });
      res.status(200).json({ url });
    } catch (e) {
      res.status(500).json({ error: 'Upload mislukt', details: e.message });
    }
  });
}
