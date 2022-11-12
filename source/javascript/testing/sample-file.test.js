//Import the sum function from sample file
//Testing sample change
var sum = require('../sample-file.js');

//Syntax for testing:
//test("sample test name", test-function())
test("100 + 200 = 300", function(){
    //Syntax for expected output: expect(actualVal).toBe(expectedVal);
    expect(sum(100,200)).toBe(300);
});

/**
 * Sample abstracted function to test sum between any two integers
 * @param {int} a 
 * @param {int} b 
 */
function testAdd(a, b){
    test(`${a} + ${b} = ${a+b}`, function(){
        expect(sum(a,b)).toBe(a+b);
    });
}

//Testing the sum of all integers between -3 and 3
for(let i = -4; i < 4; i++){
    for(let j = -4; j < 4; j++){
        testAdd(i, j);
    }
}