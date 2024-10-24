import { IncomingMessage } from 'http';
import { User } from '../common/types'

export async function parseRequest(request: IncomingMessage) {
  const buffers = []; // буфер для получаемых данных

  for await (const chunk of request) {
      buffers.push(chunk); // добавляем в буфер все полученные данные
  }
  return JSON.parse(Buffer.concat(buffers).toString()) as User;
}

export function isValid(user: User) {
  let statusCode = 400;
  let message = 'Bad request';

  if (!user.username || !user.age || !user.hobbies) {
    statusCode = 400;
    message = `body does not contain required fields`;
  }

  if (typeof user.username !== 'string' || !user.username.trim()) {
    statusCode = 400;
    message = `Invalid username type`;
  }

  if (typeof user.age !== 'number' || user.age < 1 || user.age > 150 ) {
    statusCode = 400;
    message = `Invalid age type or wrong age`;
  }

  if (!Array.isArray(user.hobbies) || !user.hobbies.every((hobby) => typeof hobby === 'string')) {
    statusCode = 400;
    message = `Invalid hobbies type`;
  }

  return {statusCode, message};
}
