// import fs from 'fs';
// import mammoth from 'mammoth';
// import path from 'path';

// export default async function handler(file: any) {
//   try {


//     const result = await mammoth.extractRawText({ file }); // or extractHTML
//     const text = result.value;

//     res.status(200).json({ text });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to read or process the file' });
//   }
// }