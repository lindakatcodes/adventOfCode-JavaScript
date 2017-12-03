const http = require('http');

http.get('http://adventofcode.com/2017/day/2/input', (response) => {
  const input = [];
  response.on('data', (chunk) => {
    input.push(chunk.toString());
  });
  response.on('end', () => {
    try {
      // const parsedInput = JSON.parse(input);
      console.log(input);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  });
});
