const fs                           = require('fs');
const path                         = require('path');
const CSVStreamParser              = require('./streams/csv-stream-parser');
const ObjectStreamMetricAggregator = require('./streams/object-stream-metric-aggregator'); // eslint-disable-line
const { pipeline }                 = require('stream');

const getDataPath = ( filename ) => {
  return path.join( __dirname, '/data', filename );
};

const csvParser = new CSVStreamParser();

const metricAgg = new ObjectStreamMetricAggregator({
  Work: ( recordValue, aggregatedValue ) => {
    const parsedVal = Number( recordValue ) || 0;
    return aggregatedValue ? parsedVal + aggregatedValue : parsedVal;
  }
});

pipeline(
  fs.createReadStream(
    getDataPath('time-logs.csv'),
    { encoding: 'utf8' }
  ),
  csvParser,
  metricAgg,

  ( err ) => {
    console.log( err );
  }
);
