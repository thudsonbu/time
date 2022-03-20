const Transform = require('stream').Transform;

class ObjectStreamMetricAggregator extends Transform {

  constructor( propToAggFunc, opts  ) {
    super({ ...opts, objectMode: true });

    this.propToAggFunc = propToAggFunc;
    this.aggregations = {};
  }

  _transform( record, encoding, callback ) {

    for ( const [ key, value ] of Object.entries( record ) ) {

      const aggFunc = this.propToAggFunc[ key ] || false;

      if ( aggFunc ) {
        this.aggregations[ key ] = this.propToAggFunc[ key ](
          value,
          this.aggregations[ key ]
        );
      }
    }

    callback();
  }

  _flush( callback ) {
    console.log( this.aggregations );
    callback( this.aggregations );
  }
}

module.exports = ObjectStreamMetricAggregator;
