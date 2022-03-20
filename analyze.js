const fs              = require('fs');
const path            = require('path');
const CSVStreamParser = require('./streams/csv-stream-parser');
const { pipeline }    = require('stream');

const getDataPath = ( filename ) => {
  return path.join( __dirname, '/data', filename );
};


pipeline(
  fs.createReadStream( getDataPath('time-logs.csv') ),
  CSVStreamParser,
  
);
