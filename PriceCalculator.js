//calculate total price
const gstTax = 0.05;
//calculate sum of each
function arrSum(arr) {
    return arr.reduce(function(a,b){
        return a + b
    }, 0);
}
//calculate total
exports.total = function(price,qty) {
    return (qty * arrSum(price)) + (qty * arrSum(price) * gstTax);
}