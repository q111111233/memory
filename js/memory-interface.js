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
