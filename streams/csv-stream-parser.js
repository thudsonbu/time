const Transform = require('stream').Transform;


class CSVStreamParser extends Transform {
  constructor( options ) {
    // object mode used as each column will be its own property on the object
    super({ ...options, objectMode: true });

    this.tail = '';
    this.properties = [];
  }

  _transform( chunk, encoding, callback ) {
    const cleanCut = chunk.endsWith('\n');
    const lines    = ( this.tail + chunk ).split('\r\n');

    if ( !cleanCut ) {
      this.tail = lines.pop();
    } else {
      this.tail = '';
    }

    // parse properties/headers
    if ( !this.properties.length && lines.length > 0 ) {
      this.properties = lines.shift().split(',');
    }

    lines.forEach( ( line ) => {
      if ( line.length ) {
        const object = {};
        const datum = line.split(',');

        console.log( this.properties );
        console.log( datum );

        if ( datum.length > this.properties.length ) {
          const msg = 'Invalid csv file, a record value likely contains a comma'; // eslint-disable-line
          throw new Error( msg );
        }

        for ( let i = 0; i < this.properties.length; i++ ) {
          object[ this.properties[ i ] ] = datum[ i ];
        }

        this.push( object );
      }
    });

    callback();
  }

  _flush( callback ) {
    callback();
  }
}

module.exports = CSVStreamParser;
