import orderDetailsModel from "../model/orderDetailsModel.js";
import {customer} from '/db/db.js';
import {items} from '/db/db.js';
import {order} from '/db/db.js';
import {orderDetails} from '/db/db.js';
import orderModel from "../model/orderModel.js";


let selectedCustomerId;
let selectedItemId;

let itemName;
let itemPrice;
let itemQty;
let orderQty;

var allTotal=0;

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

// /*Purchase Order*/
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

   
    