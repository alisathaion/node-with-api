var express = require('express');//load express
const Order = require('../models/order');//load module
var router = express.Router();
var objOrder= require('../order.json');
const c = require('../PriceCalculator')

const orders = [];

//send data shows in page index.ejs
router.get('/',(req,res) => {
    res.render('index',{
        title : "Order Your Pizza",
        size : objOrder.sizes,
        crust : objOrder.crust,
        meattopping : objOrder.meattopping,
        nonmeat : objOrder.nonmeats
    });
});
//send data shows in page orderlist.ejs
router.get('/orderlist', function(req, res){
    var vm = {title : "Order Your Pizza"};
    res.render('orderlist', vm);
});

var search = "";
router.post('/orderlist', function(req, res){

    search = req.body.searchByNameAndPhone;

});


//API or REST Endpoints are defined below Retrives all the orders
router.get('/api/orders', (req, res) => {
    if(search == ""){
        Order.find({}, (err, orders) => {
            if (err) {
                console.log(err);
                res.status(500).json({error : "Oops!"});
                return;
            }
        res.json(orders);
        }).limit(100);

    }
    if(search != ""){
        Order.find({$or:[{firstName: search},{phone: search}]},(err, orders) => {
            if (err) {
                console.log(err);
                res.status(500).json({error : "Oops!"});
                return;
            }
        res.json(orders);
        }).limit(100);
    }
});


//post data from page into server
router.post('/api/orders',(req,res) => {

  //check if data valid
  if(!req.body.firstName || !req.body.lastName || !req.body.phone || !req.body.address){
      return res.status(400).json({msg : "Missing key information for the order"});
  }
  //get price from each items selected
  var price = [];
  for(var i = 0; i < objOrder.sizes.length; i++){
      if(objOrder.sizes[i].size == req.body.size){
          price.push(objOrder.sizes[i].price);
      }
  }
  for(var i = 0; i < objOrder.crust.length; i++){
      if(objOrder.crust[i].type == req.body.crust){
          price.push(objOrder.crust[i].price);
      }
  }
  var topping = req.body.topping;
  if(req.body.topping.length > 0){
    topping.forEach(function(element) {
        for(var i = 0; i < objOrder.meattopping.length; i++){
            if(element == objOrder.meattopping[i].items){
                price.push(objOrder.meattopping[i].price);
            }
        }
        for(var i = 0; i < objOrder.nonmeats.length; i++){
            if(element == objOrder.nonmeats[i].items){
                price.push(objOrder.nonmeats[i].price);
            }
        }
    })
  }

  
  //calculate price from PriceCalculator
  let totalPrice = c.total(price,req.body.qty);

  // create object to get data
  let order = new Order(req.body); 
  order.total = totalPrice;

  //add data into array object
  //orders.push(order);

  //save data to mongodb
  order.save(order, (err)=> {
    if (err) {
        console.log(err);
        res.status(500).json({error : "Failed to save the order"});
        return;
    }
    res.json({status : "success", message : "Add order successfully!!"});        
  });    

});


module.exports = router;
