const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the Node.js CI/CD demo app!',
    version: process.env.APP_VERSION || '1.0.0',
    hostname: require('os').hostname(),
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;
