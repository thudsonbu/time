const http = require('http');
const fs   = require('fs');

const server = http.createServer( ( req, res ) => {
  try {
    const page = fs.readFileSync( __dirname + '/www/' + req.url, 'utf8' );

    res.writeHead( 200, { ContentType: 'text/html' } );
    res.end( page );

  } catch ( err ) {
    res.writeHead( 404 );
    res.end('Not Found');
  }
});

server.listen( 3000 ).on( 'listening', () => {
  console.log('server listening on port 3000');
});
