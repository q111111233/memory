(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var Card = require('./../js/memory.js').cardModule;
var Memory = require('./../js/memory.js').memoryModule;

var simpleMemory;
$(document).ready(function(){
  $("#number-form").submit(function(event){
    event.preventDefault();
    var number = $('#number').val();
    if(number%2!==0) {
      number -= 1;
    }
    simpleMemory = new Memory(number);
    for(var i=0; i<number; i++){
      $(".cards").append("<div class='card' id ='"+i+"' style='height:200px; background-color:red; width:200px; margin:20px;'></div>");
    }
    $(".card").click(function() {
      if(simpleMemory.compareCard2==-1)
      {
        var chosen = $(this).attr("id");
        var selectedCard = simpleMemory.cards[chosen];
        selectedCard.flip();
        if(selectedCard.faceUp) {
          $(this).text(selectedCard.picture);
        }
        var chose = simpleMemory.choose(chosen);
        if(chose){
          if(!simpleMemory.guess()){
            $(".reset").show();
          }
        }
      }
      if(simpleMemory.gameOver()) {
        alert("you won.");
      }
    });
    $(".reset").click(function(){
      console.log("#"+simpleMemory.compareCard1);
      console.log("#"+simpleMemory.compareCard2);
      $("#"+simpleMemory.compareCard1).text("");
      $("#"+simpleMemory.compareCard2).text("");
      simpleMemory.continue();
      $(this).hide();
    });
  });
});

},{"./../js/memory.js":1}]},{},[2]);
