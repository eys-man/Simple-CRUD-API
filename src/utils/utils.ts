import { IncomingMessage } from 'http';
import { User } from '../common/types'

export async function parseRequestData(request: IncomingMessage) {
  const buffers = []; // буфер для получаемых данных

  for await (const chunk of request) {
      buffers.push(chunk); // добавляем в буфер все полученные данные
  }
  return JSON.parse(Buffer.concat(buffers).toString()) as User;
}

export function isUserValid(user: User): string {
  let message = 'Valid';

  if (!user.username || !user.age || !user.hobbies)
    message = `Users data does not contain required fields`;

  if (typeof user.username !== 'string' || !user.username.trim())
    message = `Invalid username type`;

  if (typeof user.age !== 'number' || user.age < 1 || user.age > 150 )
    message = `Invalid age type or wrong age`;

  if (!Array.isArray(user.hobbies) || !user.hobbies.every((hobby) => typeof hobby === 'string'))
    message = `Invalid hobbies type`;

  return message;
}
