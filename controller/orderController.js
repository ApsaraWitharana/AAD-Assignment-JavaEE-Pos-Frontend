import orderDetailsModel from "../model/orderDetailsModel.js";
import {customer} from '/db/db.js';
import {items} from '/db/db.js';
import {order} from '/db/db.js';
import {orderDetails} from '/db/db.js';
import orderModel from "../model/orderModel.js";


// let selectedCustomerId;
// let selectedItemId;

// let itemName;
// let itemPrice;
// let itemQty;
// let orderQty;

// var allTotal=0;
$("#orderQty").val(0);
$("#discount").val(0);


//========== lord item code==================// 
function loadItemCodes(){
    $.ajax({
        url: "http://localhost:8080/Pos_System/item?function=getAll",
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqxhr) {

            $.each(resp, function(index, item) {
                let option = `<option>${item.code}</option>`
                $("#itemIdOption").append(option);
            });
            document.getElementById("itemIdOption").selectedIndex= -1;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
// ===========lord customer id ===========//
function loadCustIds(){
    $.ajax({
        url: "http://localhost:8080/Pos_System/customer?function=getAll",
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqxhr) {
            console.log(resp);

            $.each(resp, function(index, customer) {
                let option = `<option>${customer.id}</option>`
                $("#cusIdOption").append(option);
            });
            document.getElementById("cusIdOption").selectedIndex= -1;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error - loadCustIds");
            console.log(jqXHR);
        }
    });
}
//------------------set data customer form===============
$("#cusIdOption").on("change",function (){
    let selectedOption = $(this).val();

    $.ajax({
        url: "http://localhost:8080/Pos_System/customer?function=getById&id="+selectedOption,
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqXHR){
            console.log(resp);

            $("#orderCusName").text(resp.name);
            $("#orderCusSalary").text(resp.salary);
            $("#orderCusAddress").text(resp.address);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
});
//===item ===========
function o_findItem(id, callback){
    $.ajax({
        url: "http://localhost:8080/Pos_System/item?function=getById&code="+code,
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqXHR){
            console.log(resp);

            callback(resp);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}
//------------item form lord----------
$("#itemIdOption").on("change",function (){
    let selectedOption = $(this).val();

    o_findItem(selectedOption, function (resp){
        $("#orderFormItemName").text(resp.name);

        approximatedNumber = resp.price.toFixed(2);
        $("#orderFormPrice").text(approximatedNumber);
        $("#orderFormQtyOnHand").text(resp.qty);
    })
});
let finalTotal;
let subTotal;

//======set order id date====//
$(document).ready(function () {
    let nextOrderId = generateNextOrderID();
    $("#orderId").val(nextOrderId);

    let currentDate = new Date();
    var formattedDate = currentDate.toISOString().split('T')[0];
    $("#orderDate").val(formattedDate);

    loadItemCodes();
    loadCustIds();
});
//======== new order id ==========//
function generateNextOrderID() {
    $.ajax({
        url: "http://localhost:8080/Pos_System/order?function=getLastId",
        method: "get",
        success: function (resp, textStatus, jqxhr) {
            console.log(resp);

            if(resp == "no_ids"){
                $("#orderId").val("ORD-001");
            }else{
                let lastId = resp;
                splitOrderId(lastId);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error - generateNextOrderId");
            console.log(jqXHR);
        }
    });
}

function splitOrderId(lastId) {
    let strings = lastId.split("ORD-");
    let id = parseInt(strings[1]);
    ++id;
    let digit = String(id).padStart(3, '0');
    $("#orderId").val("ORD-" + digit);;
}

//==============
$("#btnPurchase").on('click', () => {

    let alertConfrim = confirm('Do you want to Purchase this item ?');
    if (alertConfrim==true) {

        var orderId = $('#orderId').val();
        var orderDate = $('#orderDate').val();
        var cusIdOption = $('#cusIdOption').val();
        var itemIdOption = $('#itemIdOption').val();
        var orderQty = $('#orderQty').val();
        var total = $('#total').val();
        var txtCash = $('#txtCash').val();
        var txtDiscount = $('#txtDiscount').val();

        let orderDetailObj=new orderDetailsModel(
            orderId,orderDate,cusIdOption,itemIdOption,orderQty,total,txtCash,txtDiscount
        );

        orderDetails.push(orderDetailObj);
    }

    // blindOrderRowClickEvent();
    //  clearOrderTexts();
    console.log(customer);
    clearField();

});

function generateCurrentDate(){
    $("#orderDate").val(new Date().toISOString().slice(0, 10));
}

function loadAllCustomerId() {
    $('#cusIdOption').empty();
    for (let customerArElement of customer) {
        $('#cusIdOption').append(`<option>${customerArElement.id}</option>`);
    }
}

function loadAllItemsId() {
    $('#itemIdOption').empty();
    for (let itemArElement of items) {
        $('#itemIdOption').append(`<option>${itemArElement.id}</option>`);
    }
}

loadAllItemsId();
loadAllCustomerId();
generateCurrentDate();

$('#cusIdOption').on('change', function(){
    selectedCustomerId = $('#cusIdOption option:selected').text();
    for (let customerArElement of customer) {
        if (customerArElement.id==selectedCustomerId){
            $('#orderCusName').val(customerArElement.name);
            $('#orderCusSalary').val(customerArElement.salary);
            $('#orderCusAddress').val(customerArElement.address);
             $('#itemIdOption').focus();
        }
    }
});

$('#itemIdOption').on('change', function(){
    selectedItemId = $('#itemIdOption option:selected').text();
    for (let itemArElement of items) {
        if (itemArElement.id==selectedItemId){
             itemName = itemArElement.name;
             itemPrice = itemArElement.price;
             itemQty =itemArElement.qty;

             $('#orderFormItemName').val(itemName);
             $('#orderFormPrice').val(itemPrice);
             $('#orderFormQtyOnHand').val(itemQty);
              $('#orderQty').focus();
        }
    }
});

function calTotal(itemPrice, orderQty) {
    let price=parseInt(itemPrice);
    let qty=parseFloat(orderQty);
    let total=price*qty;

    return total;
}

$("#btn_addItem").on('click', () => {
    orderQty = $('#orderQty').val();
    var CalTotal=calTotal(itemPrice,orderQty);

    allTotal+=CalTotal;

    let record = `
            <tr>
                <td>${selectedItemId}</td>
                <td>${itemName}</td> 
                <td>${itemPrice}</td>
                <td>${orderQty}</td> 
                <td>${CalTotal}</td> 
            </tr>`;
    $("#orderCart").append(record);

    let orderObj = new orderModel(CalTotal);
    order.push(orderObj);

    calTotalAllItem();
    updateQty();
    loadAllItemsId();

});

/*discount*/
let disTOGave=0;
$('#discount').on('keyup',function (){
    let dis=$('#discount').val();
    let tot=$('#total').val();
    var totMin=0;
    let subTot=0;

    console.log(dis+"=="+tot);
    totMin=parseFloat(tot)*(dis/100);
    console.log("dis Dis: "+totMin)

    subTot=tot-totMin;
    disTOGave=totMin;

    $('#subTotal').val(subTot);
})

/*Cash*/
$('#cash').on('keyup',function (){
    let cash=$('#cash').val();
    let subT=$('#subTotal').val();

    $('#balance').val((parseFloat(cash))-parseFloat(subT));
})

function clearField(){

    // clear order details
    $('#orderId').val("ORD002");
    $('#OrderDate').val("");
    $("#cusIdOption").val('C00-001');
    $("#orderCusName").val('');
    $("#orderCusAddress").val('');
    $("#orderCusSalary").val('');

  // clear item details
    $('#itemIdOption').val("I00-001");
    $('#orderFormItemName').val("");
    $('#orderFormQtyOnHand').val(0);
    $('#orderFormPrice').val("");
     $('#orderQty').val("");

    // clear payment details
    $('#cash').val("");
    $('#discount').val(0);
    $('#balance').val("");
    $('#total').val(0);
    $('#subTotal').val(0);

    // clear table details
    $('#orderCart').val("");
    
}
//add to card item =============
$("#btn_addItem").click(function (){
   let itmCode = $("#itemIdOption").val();
   let itmName = $("#orderFormItemName").text();
   let unitPrice =  $("#orderFormPrice").text();
   let qty = $("#orderQty").val();
   let total = parseFloat(unitPrice)*parseFloat(qty);

   if(itmCode != null){
       let itemDBQty = parseFloat($("#orderFormQtyOnHand").text());
       let tableCheck = "notFound";
       $("#orderCart tr").each(function() {
           let cellData = $(this).find("td:eq(0)").text();
           if(itmCode == cellData){     //if the itemCode is already in the table
               tableCheck= "found";
               let ordQtyValidResult = ordQtyValidation(qty);
               if(ordQtyValidResult){
                   let crntQty = parseFloat($(this).find("td:eq(3)").text());
                   let newQty = crntQty+parseFloat(qty);

                   if(newQty>itemDBQty){
                       alert("insufficient item amount. Please order less than the amount left.");
                   }else{
                       $(this).find("td:eq(3)").text(newQty);
                       let newTotal = parseFloat(unitPrice)*newQty;
                       $(this).find("td:eq(4)").text(newTotal);
                   }
               }else{
                   alert("Order quantity required");
               }
           }
       });

       //if the itemCode is not already in the table
       if(tableCheck == "notFound"){
           let ordQtyValidResult = ordQtyValidation(qty);
           if(ordQtyValidResult){
               if(parseFloat(qty)> itemDBQty ){
                   alert(`insufficient item amount. Please enter an amount less than ${itemDBQty}.`);
               }else{
                   let row = ` <tr>
                <td>${selectedItemId}</td>
                <td>${itemName}</td> 
                <td>${itemPrice}</td>
                <td>${orderQty}</td> 
                <td>${CalTotal}</td> 
            </tr>`;

               $("#orderCart").append(row);
               orderTblRowClicked();
               }
           }else{
               alert("Order quantity required");
           }
       }
   }else{
       alert("Please select an item first")
   }

    finalTotal = 0;
    $("#orderCart tr").each(function() {
        let eachItemTotal = parseFloat($(this).find("td:eq(4)").text());
        finalTotal = finalTotal + eachItemTotal;
        $("#total").html("&nbsp;" + finalTotal + "/=");
    });

    let discount = $("#discount").val();
    if(discount===""){
        subTotal = finalTotal;
    }else{
        let reduced_amount = (finalTotal/100)*parseFloat(discount);
        subTotal = finalTotal-reduced_amount;
    }
    $("#subTotal").html("&nbsp;" + subTotal + "/=");
});
// /*Purchase Order*/
$("#purchaseOrder").click(function (){
   if($("#cusIdOption").val()!= null){
        if($("#orderCart tr").length==0){
            alert("Add something to the cart before trying to purchase")
        }else{
            let orderId = $("#orderId").val();
            let orderDate = $("#OrderDate").val();
            let custId = $("#cusIdOption").val();
            let discount = parseFloat($("#discount").val());
            let finalPrice = subTotal;
            let orderDetails = [];

            if(discount>=0 && discount<=100){
                if($("#orderCart").val()==""){
                    alert("input cash amount before purchasing")
                }else{

                    $("#orderCart tr").each(function() {
                        let orderDetail = {
                            order_id: orderId,
                            item_code: $(this).children().eq(0).text(),
                            unit_price: $(this).children().eq(2).text(),
                            qty: $(this).children().eq(3).text()
                        }
                        orderDetails.push(orderDetail);
                    });

                    let orderObj = {
                        order_id: orderId,
                        date: orderDate,
                        cust_id: custId,
                        discount: discount,
                        total: finalPrice,
                        order_list: orderDetails
                    }

                    let jsonObj = JSON.stringify(orderObj);
                    $.ajax({
                        url: "http://localhost:8080/Pos_System/order",
                        method: "post",
                        contentType: "application/json",
                        data: jsonObj,
                        success: function (resp, textStatus, jqxhr) {
                            alert("Order placed successfully!!!");

                            let nextOrderId = generateNextOrderID();
                            $("#orderId").val(nextOrderId);

                            let currentDate = new Date();
                            var formattedDate = currentDate.toISOString().split('T')[0];
                            $("#OrderDate").val(formattedDate);

                            document.getElementById("#cusIdOption").selectedIndex= -1;
                            document.getElementById("#itemIdOption").selectedIndex= -1;
                            $("#orderQty").val(0);
                            $("#discount").val(0);
                            $("#orderCart").empty();
                            $("#orderCusName,#orderCusSalary,#orderFormItemName,#orderFormPrice,#orderFormQtyOnHand,'#total,#subTotal").text("");
                            $("#cash,#balance").val("");
                            finalTotal=0;
                            subTotal=0;
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR);
                            alert("Something went wrong. Order not placed")
                        }
                    });
                }
            }else {
                alert("discount must be between 0 and 100");
            }
        }
   }else{
       alert("Please select a customer ID")
   }
});
//=========cash and balance set  ========/
$("#cash").on("keyup", function(){
   let cash =  parseFloat($("#cash").val());
   let balance = cash - subTotal;
   if(isNaN(balance)){
   }else{
       if(balance>=0){
           $("#balance").val(balance);
           $("#purchaseOrder").prop("disabled", false);
           $("#cash").css({
               "background-color" : "white",
               "color" : "black"
           });
       }else{
           $("#purchaseOrder").prop("disabled", true);
           $("#cash").css({
               "background-color" : "#eb4a4c",
               "color" : "white"
           });
           $("#balance").val("Insufficient Cash");
       }
   }
});

 

 //=============table ===============
 function orderTblRowClicked(){
    $("#orderCart tr:last-of-type").dblclick(function (){
        let result = confirm("Are you sure to remove this item form the cart?")
        if(result){
            $(this).remove();

            finalTotal = 0;
            if($("#orderCart tr").length == 0){
                $("#total").html(0);
            }else{
                $("#orderCart tr").each(function() {
                    let eachItemTotal = parseFloat($(this).find("td:eq(4)").text());
                    finalTotal = finalTotal + eachItemTotal;
                    $("#total").html("&nbsp;" + finalTotal + "/=");
                });
            }

            let discount = $("#discount").val();
            if(discount===""){
                subTotal = finalTotal;
            }else{
                let reduced_amount = (finalTotal/100)*parseFloat(discount);
                subTotal = finalTotal-reduced_amount;
            }
            $("#subTotal").html("&nbsp;" + subTotal + "/=");
        }
    });
}

///========================================
// $('#purchaseOrder').click(function (){
//     let orderId = $('#orderId').val();
//     let orderDate = $('#OrderDate').val();
//     let customerName = $('#customerNameOrd').val();
//     let discount = disTOGave;
//     let subTotal = $('#subTotal').val();

//     /*orderModal(orderId,orderDate,customerName,discount,subTotal);*/

//     let orderObj = new OrderModel(orderId,orderDate,customerName,discount,subTotal);
//     orders.push(orderObj);

//     loadAllOrder();
//     blindOrderRowClickEvent();
//     clearOrderTexts();

//     for (var tempOrder of tempOrderCartAr){
//         tempOrderCartAr.pop();
//     }
//     tempOrderCartAr.pop();
//     addCartData();
// });


// function clearOrderTexts(){
//     $('#orderId').val("");
//     $('#OrderDate').val("");
//     $('#customerNameOrd').val("");
//     $('#salaryOrd').val("");
//     $('#addressOrd').val("");

//     $('#item').val("");
//     $('#priceOrd').val("");
//     $('#qtyOnHandOrd').val(0);
//     $('#orderQty').val("");

//     $('#cash').val("");
//     $('#discount').val(0);
//     $('#balance').val("");
//     $('#subTotal').val(0);
// }

function updateQty(){
    var orderFormQtyOnHand=$('#orderFormQtyOnHand').val();
    var updateQty=orderFormQtyOnHand-orderQty;

    let selectedItemIndex = items.findIndex(item => item.id === selectedItemId);
    if (selectedItemIndex !== -1) {
        items[selectedItemIndex].qty = updateQty;
        $('#orderFormQtyOnHand').val(updateQty);
    }
}

function calTotalAllItem(){
    var totalAllItems = 0;
    order.forEach(item => {
        totalAllItems += item.total;
    });

    $('#total').val(totalAllItems);
    $('#subTotal').val(totalAllItems);
}

$("#orderQty").on('keyup', () => {
    var orderFormQtyOnHand=parseInt($('#orderFormQtyOnHand').val());
    var orderQty =parseInt($('#orderQty').val());
    var itemQtyPattern = /^\d+$/;
    var errorMessageQty = $('.errorOrderQty');
    var errorQty = $('.errorQty');


    if (!itemQtyPattern.test(orderQty)) {
        errorQty.show();
        $('#orderQty').css('border', '2px solid red');
    } else {
        errorQty.hide();
        $('#orderQty').css('border', '2px solid green');
    }

    if (orderQty>orderFormQtyOnHand){
        $('#orderQtyValue').text(orderFormQtyOnHand);
        errorMessageQty.show();
    }else {
        errorMessageQty.hide();
    }

    if (!itemQtyPattern.test(orderQty)) {
        erroraddItem.show();
        $('#btn_addItem').css('border', '2px solid red');
    } else {
        erroraddItem.hide();
        $('#btn_addItem').css('border', '2px solid green');
    }


});

$('#txtCash').on('keyup',() => {
   let cashVal =parseInt( $('#txtCash').val());
   let subTotal =parseInt( $('#subTotal').val());
   var cashError=$('#cashError');
    // $('##total').val(subTotal-discount);
    $('#txtBalance').val(subTotal-cashVal
        
    );

   if (cashVal<subTotal){
       cashError.show();
   }else {
       cashError.hide();
   }

});

   // If the form is valid, add item to the table
    //    if (selectedItemIndex !== -1) {
    //     items[selectedItemIndex].qty = notUpdateQty;
    //     $('#orderCart').val(notUpdateQty);
    // }else{
    //   cashError.hide();
    //     }

   
    