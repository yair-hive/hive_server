/* eslint-disable no-console */
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ noServer: true });

wss.connections = {};

wss.on('listening', () => console.log('web socket start'));

wss.on('connection', function connection(ws) {
  const id = uuidv4();
  ws.id = id;
  wss.connections[id] = ws;
  console.log(`connection starts`);
  ws.send(JSON.stringify({ action: 'connection_id', id }));
  ws.on('message', function message(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) client.send(data.toString());
    });
  });
});

wss.on('error', (err) => console.log(err));

wss.sendTo = (id, data) => {
  wss.connections[id].send(JSON.stringify(data));
};

export default wss;
