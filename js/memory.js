function Memory(number) {
  var pictures = [];
  for(var i=0; i<number/2; i++) {
    pictures.push(i);
    pictures.push(i);
  }
  this.cards = [];
  for(var i=0; i<number; i++) {
    rand = Math.floor(Math.random() * (pictures.length-1));
    this.cards.push(new Card(pictures[rand],false,false));
    pictures.splice(rand, 1);
  }
  this.compareCard1 = -1;
  this.compareCard2 = -1;
}
Memory.prototype.choose = function(number) {
  console.log(this.compareCard1);
  console.log(this.compareCard2);
  if(this.compareCard1 == -1) {
    this.compareCard1 = number;
    return false;
  } else if(this.compareCard2 == -1){
    this.compareCard2 = number;
    return true;
  }
  return false;
};
Memory.prototype.guess = function() {
  compareCard1 = this.cards[this.compareCard1];
  compareCard2 = this.cards[this.compareCard2];
  if(compareCard1.picture===compareCard2.picture) {
    compareCard1.matched = true;
    compareCard2.matched = true;
    this.compareCard1 = -1;
    this.compareCard2 = -1;
    return true;
  } else {
    return false;
  }
};
Memory.prototype.continue = function() {
  this.compareCard1 = -1;
  this.compareCard2 = -1;
  this.compareCard1.faceUp = false;
  this.compareCard2.faceUp = false;
};
Memory.prototype.gameOver = function() {
  for(var i=0; i<this.cards.length; i++) {
    if(!this.cards[i].matched) {
      return false;
    }
  }
  return true;
};

function Card(picture, faceUp, matched) {
  this.picture = picture;
  this.faceUp = faceUp;
  this.matched = matched;
}
Card.prototype.flip = function() {
  this.faceUp = true;
};

exports.cardModule = Card;
exports.memoryModule = Memory;
