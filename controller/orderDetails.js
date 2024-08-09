function od_findOrder(id, callback){
    $.ajax({
        url: "http://localhost:8080/Pos_System/order?function=getById&id="+id,
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqXHR){
            callback(resp.order_id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            callback(null);
        }
    });
}

//====================================

$("#placeOrder,#placeOrder").click(function (){

                $.ajax({
                    url: "http://localhost:8080/Pos_System/orderDetails?function=getById&id="+value,
                    method: "get",
                    dataType: "json",
                    success: function (resp, textStatus, jqxhr) {
                        console.log(resp);

                        $("#placeOrder,#placeOrder").css("display", "block");
                        $("#orderDate").text(resp.date);
                        $("#cusIdOption").text(resp.cust_id);
                        $("#discount").text(resp.discount);
                        $("#total").text(resp.total);

                        $("#od_tBody").empty();
                        for (let i = 0; i < resp.order_list.length; i++){
                            let itemCode = resp.order_list[i].item_code;
                            let unitPrice = resp.order_list[i].unit_price;
                            let qty = resp.order_list[i].qty;

                            let row = `<tr>
                                       <td>${itemCode}</td>
                                       <td>${unitPrice}</td>
                                       <td>${itemName}</td>
                                       <td>${qty}</td>
                                  </tr>`;

                            $("#od_tBody").append(row);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                });
            
        });
