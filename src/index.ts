import http from 'http';
import "dotenv/config";
import { DEFAULT_HOST, DEFAULT_PORT } from './common/types';
import { dispatcher } from './dispatcher/dispatcher'

const server = http.createServer();

server.on('request', dispatcher);

const port = process.env.PORT || DEFAULT_PORT;
const host = process.env.HOST || DEFAULT_HOST;
server.listen(port, () => console.log(`server is running on http://${host}:${port}`));
