//get data to orderlist
$(function ready() {
    $.getJSON("/api/orders", function (data) {
        data.forEach(function (item) {
            $('#orderlist').append('<tr><td>' + item.firstName +'</td><td>'
                                              + item.lastName +'</td><td>'
                                              + item.phone +'</td><td>'
                                              + item.address +'</td><td>'
                                              + item.size +' '
                                              + item.crust +' '
                                              + item.topping +'</td><td>'
                                              + item.qty +'</td><td>'
                                              + item.total +'</td></tr>');
        });
    });


    $('#search').bind("enterKey",function(e){
        //do stuff here
     });
     $('#search').keyup(function(e){
         if(e.keyCode == 13)
         {
            //get value from search textbox
            var search = JSON.stringify({
                searchByNameAndPhone: $('#search').val()
            });

            //if post correct
            $.ajax({
                url: '/orderlist',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: search,
                success: function (json, status, request) {
                    $('#statusMsg').removeClass();
                    $('#statusMsg').addClass('alert alert-success');
                    $('#statusMsg').html('Added the order');
                },
                error: function (request, status) {
                    $('#statusMsg').removeClass();
                    $('#statusMsg').addClass('alert alert-danger');
                    $('#statusMsg').html('Error adding the order');
                    console.log('Request failed : ', status);
                }
            });

            //get data by searching name
            $.getJSON("/api/orders", function (data) {
                $('#orderlist tr').remove();
                $('#orderlist').append('<tr><th>Firstname</th><th>Lastname</th><th>Phone</th><th>Address</th><th>Pizza Details</th><th>Qty</th><th>Total</th></tr>');
                data.forEach(function (item) {
                    $('#orderlist').append('<tr><td>' + item.firstName +'</td><td>'
                                                      + item.lastName +'</td><td>'
                                                      + item.phone +'</td><td>'
                                                      + item.address +'</td><td>'
                                                      + item.size +' '
                                                      + item.crust +' '
                                                      + item.topping +'</td><td>'
                                                      + item.qty +'</td><td>'
                                                      + item.total +'</td></tr>');
                });
            });

         }
    });

});

