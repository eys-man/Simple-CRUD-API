import { IncomingMessage, ServerResponse } from 'http';
import { isValid, parseRequest } from '../utils/utils';
import { addUser, deleteUser, getUser, users } from '../db/db';
import { validate } from 'uuid';

export const dispatcher = async (request: IncomingMessage, response: ServerResponse): Promise<void> => { 
  console.log(`method is ${request.method}, url = ${request.url}`);
  const user = await parseRequest(request);
  let {statusCode, message} = isValid(user);

  if(statusCode == 200) {
    switch(request.method) {
      case 'POST':
        if (request.url !== '/api/users') {
          statusCode = 400;
          message = `bad url`;
          break;
        }
        message = JSON.stringify(user);
        addUser(user);
        statusCode = 201;
        break;
      case 'GET':
        if (request.url === '/api/users') {
          message = JSON.stringify(users);
          statusCode = 200;
          break;
        } else if( request.url?.startsWith('/api/users/')) {
          const urlParts = request.url?.split('/');
          const userId = urlParts[3];

          if ( validate(userId) ) {
            const foundUser = getUser(userId);
            if (foundUser) {
              message = JSON.stringify(foundUser);
              statusCode = 200;
            } else {
              statusCode = 404;
              message = `user with ${userId} not exists`;
            }
          } else {
            statusCode = 400;
            message = `Invalid user ID! ${userId}. UUID required`;
          }
        }
        break;
      case 'DELETE':
        if( request.url?.startsWith('/api/users/')) {
          const urlParts = request.url?.split('/');
          const userId = urlParts[3];

          if( validate(userId) ) {
            if( deleteUser(userId)) statusCode = 204;
            else {
              statusCode = 404;
              message = `user with ${userId} not exists`;
            }
          } else {
              statusCode = 400;
              message = `Invalid user ID! ${userId}. UUID required`;
          }
        }
        break;
      default:
        statusCode = 400;
      break;
    }
  }

  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(message);

  response.end();
};
