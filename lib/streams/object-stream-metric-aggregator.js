const Transform = require('stream').Transform;

function ObjectStreamMetricAggregator( propToAgg ) {
  Transform.call( this, { objectMode: true } );

  this.propToAgg = propToAgg;

  this._transform = function _transform( record, encoding, callback ) {

    for ( const [ key, value ] of Object.entries( record ) ) {

      const agg = this.propToAgg[ key ] || false;

      if ( agg ) {
        agg.operation( value );
      }
    }

    callback();
  };

  this._flush = function _flush( callback ) {
    for ( const agg of Object.values( this.propToAgg ) ) {
      console.log( agg.getResult() );
    }

    callback();
  };
}

ObjectStreamMetricAggregator.prototype = Object.create( Transform.prototype );

module.exports = ObjectStreamMetricAggregator;
