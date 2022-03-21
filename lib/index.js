const fs                           = require('fs');
const path                         = require('path');
const CSVStreamParser              = require('./streams/csv-stream-parser');
const ObjectStreamMetricAggregator = require('./streams/object-stream-metric-aggregator'); // eslint-disable-line
const Aggregator                   = require('./classes/aggregator');
const pipeline                     = require('stream').pipeline;

const getDataPath = ( filename ) => {
  return path.join( __dirname, '/data', filename );
};

const csvParser = new CSVStreamParser();

const operation = ( value, state ) => {
  state.sum = Number( value ) + state.sum || Number( value );
};

const getResult = ( state ) => {
  return state.sum;
};

const sumAgg = new Aggregator({ operation, getResult });

const metricAgg = new ObjectStreamMetricAggregator({
  Work: sumAgg
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
