'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

var stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
};

function printStacks() {
    console.log("a: " + stacks.a);
    console.log("b: " + stacks.b);
    console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
    // return(stacks['b'].push(stacks['a'].pop())) || return(stacks['c'].push(stacks['a'].pop()));
    // return(stacks['a'].push(stacks['b'].pop())) || return(stacks['c'].push(stacks['b'].pop()));
    // return(stacks['b'].push(stacks['c'].pop())) || return(stacks['a'].push(stacks['c'].pop()));
    stacks[endStack].push(stacks[startStack].pop());
}

function isLegal(startStack, endStack) {
   var startStackArray = stacks[startStack];
   var endStackArray = stacks[endStack];

   if (startStackArray.length === 0) {
     return false;
   }
   else if (endStackArray.length === 0) {
     return true;
   }
   else {
     return (startStackArray[startStackArray.length - 1] < endStackArray[endStackArray.length - 1]);

   }
};

function checkForWin() {
    if (stacks.b.length === 4 || stacks.c.length === 4){
      console.log("You won!");
      return true;
    }
    else {
      return false;
    }
};

function towersOfHanoi(startStack, endStack) {
    if (isLegal(startStack, endStack)) {
      movePiece(startStack, endStack);
    };
    checkForWin();

};

function getPrompt() {
    printStacks();
    prompt.get(['start stack', 'end stack'], function (error, result) {
        towersOfHanoi(result['start stack'], result['end stack']);
        getPrompt();
    });
}

// Tests

if (typeof describe !== 'undefined') {

    describe('#towersOfHanoi()', function () {
        it('should be able to move a block', function () {
            towersOfHanoi('a', 'b');
            assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
        });
    });

    describe('#isLegal()', function () {
        it('should not allow an illegal move', function () {
            stacks = {
              a: [4, 3, 2],
              b: [1],
              c: []
            };
            assert.equal(isLegal('a', 'b'), false);
        });
        it('should allow a legal move', function () {
            stacks = {
              a: [4, 3, 2, 1],
              b: [],
              c: []
            };
            assert.equal(isLegal('a', 'c'), true);
        });
    });
    describe('#checkForWin()', function () {
        it('should detect a win', function () {
            stacks = { a: [], b: [4, 3, 2, 1], c: [] }
            assert.equal(checkForWin(), true);
            stacks = { a: [1], b: [4, 3, 2], c: [] }
            assert.equal(checkForWin(), false);
        });
    })
} else {

    getPrompt();

}
