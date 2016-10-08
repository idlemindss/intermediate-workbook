'use strict';

$(document).ready(function() {

$(".grow").hover(
      function(){$(this).animate({width: '515px', height:'121px'}, 500);},
      function(){$(this).animate({width: '500px', height:'101px'}, 500);}
);
var block = null;
$('[data-stack]').click(function() {
          if (!block) {
            block = $(this).children().last().detach();
          } else {
            var lastStackedBlock = $(this).children().last().data('block');
            if ($(block).data('block') < lastStackedBlock || !lastStackedBlock) {
              $(this).append(block);
              block = null;
              checkForWin();

            }
          }



function checkForWin() {
  if ($('[data-stack="2"]').children().length === 4 ||
  $('[data-stack="3"]').children().length === 4) {
      $('#announce-game-won').text('You Won!');
  }
}

  });




    });
