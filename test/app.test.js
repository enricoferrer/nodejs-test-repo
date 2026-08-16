const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../app');

function request(server, path) {
  return new Promise((resolve, reject) => {
    const { port } = server.address();
    http.get(`http://127.0.0.1:${port}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    }).on('error', reject);
  });
}

test('GET /api/status returns app info', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const { status, body } = await request(server, '/api/status');
  assert.strictEqual(status, 200);
  assert.match(body.message, /Hello from the Node.js CI\/CD demo app!/);
});

test('GET /health returns ok', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const { status, body } = await request(server, '/health');
  assert.strictEqual(status, 200);
  assert.strictEqual(body.status, 'ok');
});
