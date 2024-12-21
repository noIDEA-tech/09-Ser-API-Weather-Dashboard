//PROVIDED CODE:
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
//router.get method defins a route handler for GET requests to the root URl ('/'). When a GET request is made to ('/'), the callback function is executed.
router.get('/', (_, res) => {
//res.sendFile is a method to send a file as an HTTP response; path.join(....) constructs the path to the index.html file relative to the current directory (__dirname)
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;







