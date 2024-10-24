import { IncomingMessage, ServerResponse } from 'http';
import { isUserValid, parseRequestData } from '../utils/utils';
import { addUser, deleteUser, getUser, updateUser, users } from '../db/db';
import { validate } from 'uuid';
import { User } from '../common/types';

export const dispatcher = async (request: IncomingMessage, response: ServerResponse): Promise<void> => { 
  console.log(`method is ${request.method}, url = ${request.url}`);
  // const user = await parseRequestData(request);
  // let {statusCode, message} = isValid(user);
  let user: User;
  let statusCode: number = -1;
  let message: string = ``;

  if( request.url?.startsWith('/api/users') ) {
    switch(request.method) {
      case 'POST':
        if (request.url !== '/api/users') {
          statusCode = 400;
          message = `Bad URL`;
          break;
        }
        // прочитать нового user
        user = await parseRequestData(request);
        message = isUserValid(user);
        if( message !== `Valid`) {
          statusCode = 400;
        } else {
          message = JSON.stringify( addUser(user) );
          statusCode = 201;
        }
        break;
      case 'GET':
        if (request.url === '/api/users') {
          message = JSON.stringify(users);
          statusCode = 200;
          break;
        } else {
          const urlParts = request.url?.split('/');
          const userId = urlParts[3];

          if ( validate(userId) ) { // проверка на uuid
            const foundUser = getUser(userId);
            if (foundUser) {
              message = JSON.stringify(foundUser);
              statusCode = 200;
            } else {
              statusCode = 404;
              message = `User with ${userId} not exists`;
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

          if( validate(userId) ) { // проверка на uuid
            if( deleteUser(userId)) statusCode = 204;
            else {
              statusCode = 404;
              message = `User with ${userId} not exists`;
            }
          } else {
              statusCode = 400;
              message = `Invalid user ID! ${userId}. UUID required`;
          }
        } else {
          statusCode = 400;
          message = `Bad URL`;
        }
        break;
      case 'PUT':
        if( request.url?.startsWith('/api/users/')) {
          const urlParts = request.url?.split('/');
          const userId = urlParts[3];

          if( validate(userId) ) { // проверка на uuid
            // прочитать нового user
            const newUser = await parseRequestData(request);
            newUser.id = userId;
            message = isUserValid(newUser);
            if( message !== `Valid`) {
              statusCode = 400;
            } else if( updateUser(userId, newUser )) {
                message = JSON.stringify(newUser);
                statusCode = 201;
            } else {
                statusCode = 404;
                message = `User with ${userId} not exists`;
            }
          } else {
              statusCode = 400;
              message = `Invalid user ID! ${userId}. UUID required`;
          }
        } else {
          statusCode = 400;
          message = `Bad URL`;
        }
        break;
      default:
        statusCode = 400;
        message = `Bad request`;
      break;
    }
  } else {
    statusCode = 400;
    message = `Bad URL`;
  }

  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(message);

  response.end();
};
