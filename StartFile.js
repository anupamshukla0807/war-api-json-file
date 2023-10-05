const fs = require('fs');
const http = require('http');
const axios = require('axios');
const fetchRepositoryData=require('./solution2.js');
const fetchNobelPrizes=require('./solution3.js');
const processAndExportData= require('./solution4.js');
const battleWarData= require('./solution1.js');

// Now you can use the exported data in your server.js file
 // This will log the data to the console

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const result = await battleWarData();
      const html = generateHTML3(result.data);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error: ' + error.message);
    }
  }
  if (req.url === '/solution2') {
    const searchQuery = "YOUR_SEARCH_QUERY_HERE"; // Replace with your desired search query

    try {
      const result = await fetchRepositoryData(searchQuery);
      const html = generateHTML(result);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error: ' + error.message);
    }
  }
  if (req.url === '/solution3') {
    try {
      const result = await fetchNobelPrizes();
      const html = generateHTML2(result);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error: ' + error.message);
    }
  }
  
  if (req.url === '/solution4') {
    try {
      const result = await processAndExportData();
      const html = generateHTML4(result);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error: ' + error.message);
    }
  }
});

function generateHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>GitHub Repository Data</title>
      </head>
      <body>
        <h1>GitHub Repository Data</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
    </html>
  `;
}
function generateHTML2(data) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Chemistry Price Data</title>
      </head>
      <body>
        <h3>People who won Nobel Prizes in Chemistry from 2000 to 2019:</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
    </html>
  `;
}

function generateHTML3(data){
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>War-Battle Data</title>
      </head>
      <body>
        <h1>War-Battle Data</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
    </html>
  `;
}
function generateHTML4(data){
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>AirlinesAPI Filter</title>
      </head>
      <body>
        <h1>AirLines API Filter </h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
    </html>
  `;
}


const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
