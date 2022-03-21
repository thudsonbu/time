const Transform       = require('stream').Transform;
const stringSafeSplit = require('../util/string-safe-split');

function CSVStreamParser() {
  Transform.call( this, { objectMode: true } );

  this.tail = '';
  this.properties = [];

  this._transform = function _transform( chunk, encoding, callback ) {
    const cleanCut = chunk.endsWith('\n');
    const lines    = ( this.tail + chunk ).split('\r\n');

    if ( !cleanCut ) {
      this.tail = lines.pop();
    } else {
      this.tail = '';
    }

    // parse properties/headers
    if ( !this.properties.length && lines.length > 0 ) {

      // string safe split takes into account a potential comma in a value
      this.properties = stringSafeSplit( lines.shift(), ',' );
    }

    lines.forEach( ( line ) => {
      if ( line.length ) {
        const object = {};

        // string safe split takes in to account a potential comma in a value
        const datum = stringSafeSplit( line, ',' );

        for ( let i = 0; i < this.properties.length; i++ ) {
          object[ this.properties[ i ] ] = datum[ i ];
        }

        this.push( object );
      }
    });

    callback();
  };

  this._flush = function _flush( callback ) {
    callback();
  };
}

CSVStreamParser.prototype = Object.create( Transform.prototype );

module.exports = CSVStreamParser;
