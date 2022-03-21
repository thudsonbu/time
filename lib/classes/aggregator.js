function Aggregator( opts ) {
  this._operation = opts.operation;
  this._getResult = opts.getResult;

  this.state = {};

  this.operation = ( value ) => {
    this._operation( value, this.state );
  };

  this.getResult = () => {
    return this._getResult( this.state );
  };
}

module.exports = Aggregator;
