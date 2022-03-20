const Transform = require('stream').Transform;

class ObjectMetricStream extends Transform {

  constructor( options, propertyToMetricMap ) {
    super({ ...options, objectMode: true });

    this.propertyToMetricMap = propertyToMetricMap;
  }

  _transform( chunk, encoding, callback ) {

  }

}
