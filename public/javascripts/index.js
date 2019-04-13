//post data from index 
$(function ready() {
    $("#submitForm").submit(function (event) {
        event.preventDefault();

        //add topping into an array
        var toppingItem = [];
            $.each($("input[name='topping']:checked"), function(){            
                toppingItem.push($(this).val());
            });
            toppingItem.join(", ");

        var orderList = JSON.stringify({
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            phone: $('#phone').val(),
            address: $('#address').val(),
            size: $('#size:checked').val(),
            crust: $('#crust:checked').val(),
            qty: $('#qty').val(),
            topping: toppingItem

        });

        $.ajax({
            url: '/api/orders',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: orderList,
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

    });
});
