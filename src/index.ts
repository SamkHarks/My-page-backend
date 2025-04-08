import app from '@/app.js';

const PORT = Number(process.env['PORT']) || 3001;
const HOST = process.env['NODE_ENV'] === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
