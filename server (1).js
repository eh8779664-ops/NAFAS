const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  // API endpoint
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { system, messages, max_tokens } = JSON.parse(body);
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: max_tokens || 400, system, messages })
        });
        const data = await response.json();
        const reply = data?.content?.[0]?.text || null;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: null }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = '';
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else if (req.url === '/data.js') {
    filePath = path.join(__dirname, 'data.js');
  }

  if (filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      const ct = filePath.endsWith('.js') ? 'application/javascript' : 'text/html; charset=utf-8';
      res.writeHead(200, { 'Content-Type': ct });
      res.end(data);
    });
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => console.log('nafas running on port ' + PORT));
