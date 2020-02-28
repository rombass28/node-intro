function rollDice () {
    return new Promise (function(resolve, reject) {
          setTimeout(() => {
              resolve(Math.ceil(Math.random() * 6));
          }, 1000);
      })
  }

  module.exports = rollDice;