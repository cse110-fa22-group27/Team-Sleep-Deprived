/**
 * Sample sum function to test the validity
 * @param {int} a 
 * @param {int} b 
 */
function sum(a,b){
    //Sample case of failure
    if(a == -3 && b == -3){
        return -1;
    }
    return a + b;
}

module.exports = sum;