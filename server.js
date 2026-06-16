const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY;

http.createServer(function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', function(d) { body += d; });
    req.on('end', function() {
      const parsed = JSON.parse(body);
      const postData = JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: parsed.max_tokens || 400,
        system: parsed.system,
        messages: parsed.messages
      });

      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const https = require('https');
      const apiReq = https.request(options, function(apiRes) {
        let data = '';
        apiRes.on('data', function(chunk) { data += chunk; });
        apiRes.on('end', function() {
          const parsed2 = JSON.parse(data);
          const reply = parsed2.content && parsed2.content[0] ? parsed2.content[0].text : null;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ reply: reply }));
        });
      });

      apiReq.on('error', function(e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: null }));
      });

      apiReq.write(postData);
      apiReq.end();
    });
    return;
  }

  if (req.url === '/data.js') {
    fs.readFile(path.join(__dirname, 'data.js'), function(err, data) {
      if (err) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
    return;
  }

  fs.readFile(path.join(__dirname, 'index.html'), function(err, data) {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });

}).listen(PORT, function() {
  console.log('nafas running on port ' + PORT);
  console.log('API KEY:', API_KEY ? 'SET' : 'NOT SET');
});
