import itemModel from '/model/itemModel.js';
import {items} from '/db/db.js';

var recordIndex;

function loadTable(){
    $('#ItemsTable').empty();

    items.map((item, index) => {
        let record = `
            <tr>
                <td class="item-id-value">${item.id}</td>
                <td class="item-name-value">${item.name}</td> 
                <td class="item-price-value">${item.price}</td>
                <td class="item-qty-value">${item.qty}</td> 
            </tr>`;
        $("#ItemsTable").append(record);
    });
}

$(".item_save_btn").on('click', () => {

    let alertConfrim = confirm('Do you  want to add this item');
    if (alertConfrim==true) {

        var itemId = $('#IID').val();
        var itemName = $('#IName').val();
        var itemPrice = $('#IPrice').val();
        var itemQty = $('#Iquentity').val();

        let itemObj = new itemModel(
            itemId, itemName, itemPrice, itemQty
        );

        items.push(itemObj);

        loadAllItemsId();
        loadTable();
        clearField();
    }else {
        clearField();
    }
});

$("#ItemsTable").on('click', 'tr', function() {
    let index = $(this).index();
    recordIndex = index;

    let id = $(this).find(".item-id-value").text();
    let name = $(this).find(".item-name-value").text();
    let price = $(this).find(".item-price-value").text();
    let qty = $(this).find(".item-qty-value").text();


    $("#IID").val(id);
    $("#IName").val(name);
    $("#IPrice").val(price);
    $("#Iquentity").val(qty);
});
$("#ItemsTable").on('dblclick','tr',function() {
    let alertConfrimDelete = confirm('Do you  want to delete this item??');
    if (alertConfrimDelete==true){
        let index = $(this).index();
        recordIndex = index;
        $('.item_delete_btn').click();
    }
});

$(".item_delete_btn").on('click', () => {
     alert("Do You Want to Delete this item??")
    items.splice(recordIndex, 1);
    loadTable();
    clearField();
  
});

function clearField(){
    $("#IID").val('');
    $("#IName").val('');
    $("#IPrice").val('');
    $("#Iquentity").val('');
}

$(".item_update_btn").on('click', () => {
    alert("Update Item Successfully!!")
    var itemId = $('#IID').val();
    var itemName = $('#IName').val();
    var itemPrice = $('#IPrice').val();
    var itemQty = $('#Iquentity').val();

    let itemUpdateObj = items[recordIndex];
    itemUpdateObj.id=itemId;
    itemUpdateObj.name=itemName;
    itemUpdateObj.price=itemPrice;
    itemUpdateObj.qty=itemQty

    loadTable();
    clearField();
});

function loadAllItemsId() {
    $('#itemIdOption').empty();
    for (let itemArElement of items) {
        $('#itemIdOption').append(`<option>${itemArElement.id}</option>`);
    }
}