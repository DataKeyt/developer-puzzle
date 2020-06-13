/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import * as request from 'request-promise-native';
import { environment } from './environments/environment';
import { server_config } from './server-config/server-config';

const server = new Server(server_config);
const requestURL = environment.apiURL + 'beta/stock/';

const fetchStocksData = async (symbol: string, period: string) => {
  try {
    const url = `${requestURL}${symbol}/chart/${period}?token=${
      environment.apiKey
    }`;
    const payload = await request(url, {
      json: true
    });
    return payload;
  } catch (error) {
    return error.message;
  }
};

server.method('fetchStocksData', fetchStocksData, {});

const init = async () => {
  server.route({
    method: 'GET',
    path: '/api/stocks/{symbol}/{period}',
    handler: async (req) => {
      const { symbol, period } = req.params;

      return await server.methods.fetchStocksData(symbol, period);
    },
    options: { cache: { privacy: 'private', expiresIn: 86400000 } }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
