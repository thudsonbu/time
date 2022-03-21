
function stringSafeSplit( string, delimiter ) {
  const output = [];

  let inString = false;
  let val      = '';

  for ( let i = 0; i < string.length; i++ ) {
    const char = string[ i ];

    if ( inString ) {
      if ( char === '"' ) {
        inString = false;
      } else {
        val += char;
      }
    } else {
      if ( char === '"' ) {
        inString = true;
      } else if ( char === delimiter ) {
        output.push( val );
        val = '';
      } else {
        val += char;
      }
    }

  }

  if ( val.length ) {
    output.push( val );
  }

  return output;
}

module.exports = stringSafeSplit;
