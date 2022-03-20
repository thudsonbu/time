

class Sum {
  constructor() {
    this.sum = 0;
  }

  add( val ) {
    this.sum = this.sum + val;
  }

  getResult() {
    return this.sum;
  }
}

module.exports = Sum;
