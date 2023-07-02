import http, { Server, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import handleRoutes from './routes';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  handleRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server started on the port: ${PORT}`);
});
