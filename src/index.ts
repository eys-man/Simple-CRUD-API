import http from 'http';
import "dotenv/config";
import { DEFAULT_PORT } from './common/types';
import { dispatcher } from './dispatcher/dispatcher'

const server = http.createServer();

server.on('request', dispatcher);

server.listen(DEFAULT_PORT, () => console.log(`server is running on http://localhost:${DEFAULT_PORT}`));
