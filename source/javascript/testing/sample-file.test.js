/**
* @jest-environment jsdom
*/


//Import the sum function from sample file
//Testing sample change
const { BrowserRouter } = require('react-router-dom');
var sum = require('../sample-file.js');

//Syntax for testing:
//test("sample test name", test-function())
test('100 + 200 = 300', function(){
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

//testing to see if any of the html inside a specific block has changed
test('Test sample snapshot', () => {
	const html = `
	<div>
        <form id='box'>

            <div class="inputsec">
                <label for="username" class="txt">Username: </label><br>
                <input type="text" id="username" class= "txtinput" name="username"><br>
            </div>

            <div class="inputsec" id="passwordgroup">
                <label for="password" class="txt">Password: </label><br>
                <input type="password" id="password" class= "txtinput" name="password"><br>
            </div>

            <div id="check">
                <input type="checkbox" id="rememberme" name="rememberme" value="rememberme">
                <label for="rememberme" class="txt">Remember Me</label><br>
            </div>
        
            <input type="submit" id='submit'  value="Login >">
        </form>
    </div>  
	`
	expect(html).toMatchSnapshot()
})
