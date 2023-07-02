import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { get_users, get_user_by_id, add_user, update_user, delete_user } from '../store/store';

const handleRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { pathname, query } = parse(req.url!, true);
  const userId = pathname!.slice(pathname!.lastIndexOf('/') + 1);

  switch (pathname) {
    case '/api/users':
      if (req.method === 'GET') {
        const users = get_users();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const { username, age, hobbies } = JSON.parse(body);
          if (!username || !age || !hobbies) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
          } else {
            add_user(username, age, hobbies);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User created successfully' }));
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
      }
      break;

    case `/api/users/${userId}`:
      if (req.method === 'GET') {
        const user = get_user_by_id(userId);
        if (user) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'User not found' }));
        }
      } else if (req.method === 'PUT') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const { username, age, hobbies } = JSON.parse(body);
          if (!username && !age && !hobbies) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing fields to update' }));
          } else {
            const updatedUser = update_user(userId, username, age, hobbies);
            if (updatedUser) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(updatedUser));
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'User not found' }));
            }
          }
        });
      } else if (req.method === 'DELETE') {
        const deletedUser = delete_user(userId);
        if (deletedUser) {
          res.writeHead(204);
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'User not found' }));
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
      }
      break;

      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
        break;
  }
};

export default handleRoutes;