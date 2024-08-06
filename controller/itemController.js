// import itemModel from '/model/itemModel.js';
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

//=====================save btn action==================

$(".item_save_btn").click(function() {
    let code = $("#IID").val();
    let name = $("#IName").val();
    let price = $("#IPrice").val();
    let qty = $("#Iquentity").val();

    let itemObj ={
        code: code,
        name: name,
        price: price,
        qty: qty
    }

    let jsonObj = JSON.stringify(itemObj);
    $.ajax({
        url: "http://localhost:8080/Pos_System/item",
        method: "post",
        contentType: "application/json",
        data: jsonObj,
        success: function (resp, textStatus, jqxhr) {
            if(jqxhr.status==201){
                alert("item added successfully!!!");
                getAllItems();
                clearField();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status==409){
                alert("Duplicate values. Please check again");
                return;
            }else{
                alert("Something happened. Item not added");
            }
        }
    });
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
//==========**delete btn action===================
$(document).ready(function() {
    $(".item_delete_btn").click(function () {
        let code = $("#IID").val().trim();
        if (code) {
            deleteItem(code);
        } else {
            alert("Please enter an item code.");
        }
    });


//-----------
function deleteItem(code) {
    let item = findItem(code, function(item) {
        if (!item) {
            alert("No item with the code: " + code + " found");
        } else {
            $.ajax({
                url: "http://localhost:8080/Pos_System/item",
                method: "DELETE",
                data: { code: code },
                success: function (resp, textStatus, jqXHR) {
                    console.log(resp);

                    if (jqXHR.status === 201) {
                        alert("Item deleted successfully!!");
                        // Optionally, refresh the item list
                        getAllItems();
                        clearField();
                    } else {
                        alert("Failed to delete the item. Status: " + jqXHR.status);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Something went wrong. Item not removed. Error: " + textStatus);
                    console.error("Error details:", errorThrown);
                }
            });
        }
    });
}
});
// function clearField() {
//     $("#IID").val('');
// }

// // Assuming you have an array or object where items are stored
// function findItem(code, callback) {
//     // Replace this with your actual implementation
//     // Simulating an item lookup
//     let items = [
//         { code: '1', name: 'Item 1' },
//         { code: '2', name: 'Item 2' }
//     ];
//     let item = items.find(item => item.code === code);
//     callback(item);
// }

// $(document).ready(function() {
//     $(".item_delete_btn").click(function () {
//         let id = $("#IID").val().trim();
//         if (id) {
//             deleteItem(id);
//         } else {
//             alert("Please enter an ID.");
//         }
//     });
// });

// function deleteItem(id) {
//     $.ajax({
//         url: "http://localhost:8080/Pos_System/item?id=" + id,
//         method: "delete",
//         success: function (resp, textStatus, jqXHR) {
//             console.log(resp);

//             if (jqXHR.status == 201) {
//                 alert("Item deleted successfully!!");
//                 // getAllItems(); // Uncomment if you want to refresh the item list
//                 clearField();
//             } else {
//                 alert("Failed to delete the item. Status: " + jqXHR.status);
//             }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             alert("Something went wrong. Item not removed. Error: " + textStatus);
//         }
//     });
// }

// function clearField() {
//     $("#IID").val('');
// }

// // Make sure findItem function exists and correctly returns the item ID
// function findItem(id, callback) {
//     // Assuming you have an array or object where items are stored
//     let items = []; // Replace with your actual items array
//     let item = items.find(item => item.id === id);
//     callback(item ? item.id : undefined);
// }

//===========clear field=============
function clearField(){
    $("#IID").val(''),
    $("#IName").val(''),
    $("#IPrice").val(''),
    $("#Iquentity").val(''),

    setItemBtn();
    $(".fw-bold").css("display", "none");
}
//==============================
function setDataToItemTxtFields(code,name,unitPrice,qty){
$(".card-body").collapse("show");
    $("#IID").val(code);
    $("#IName").val(name);
    $("#IPrice").val(price);
    $("#Iquentity").val(qty);
     $("#IID,#IName,#IPrice,#Iquentity").addClass("border-secondary-subtle");
    setItemBtn();
}
//========================update btn actiion========================

$(".item_update_btn").click(function () {
    alert("Update Item Successfully!!")
    let code = $('#IID').val();
    let name = $('#IName').val();
    let price = $('#IPrice').val();
    let qty = $('#Iquentity').val();

     let itemObj ={
        code: code,
        name: name,
        price: price,
        qty: qty
    }

    let jsonObj = JSON.stringify(itemObj);
    $.ajax({
        url: "http://localhost:8080/Pos_System/item",
        method: "put",
        contentType: "application/json",
        data: jsonObj,
        success: function (resp, textStatus, jqxhr) {
            if(jqxhr.status==204){
                alert("item updated successfully");
                clearItemTxtFields();
                getAllItems();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status==409){
                alert("Duplicate values. Please check again");
                return;
            }else{
                alert("Something happened. Item details not updated");
            }
        }
    });
})
//================
function findItem(id, callback) {
    $.ajax({
        url: "http://localhost:8080/Pos_System/item?function=getById&id="+id,
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqXHR){
            callback(resp.code);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            callback(null);
        }
    });
}

//=====================================================
//--------------------
function getAllItems() {
    $("#ItemsTable").empty();

    $.ajax({
        url: "http://localhost:8080/Pos_System/item?function=getAll",
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqxhr) {
            console.log(resp);

            $.each(resp, function(index, item) {
                approximatedNumber = item.price.toFixed(2);
                let row = `
                     <tr>
                <td class="item-id-value">${item.id}</td>
                <td class="item-name-value">${item.name}</td> 
                <td class="item-price-value">${item.price}</td>
                <td class="item-qty-value">${item.qty}</td> 
            </tr>
               `;
                $("#ItemsTable").append(row);
            });
            onTblItemRowClick();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
//-----------------------------------------
function onTblItemRowClick() {
    let singleClickTimer;

    $("#ItemsTable>tr").on("mousedown", function (event) {
        if (event.which === 1) { // Left mouse button (1) clicked
            let row = $(this);
            if (singleClickTimer) {
                clearTimeout(singleClickTimer);
                singleClickTimer = null;
                // Handle double click
                deleteItem(row.children().eq(0).text());
                getAllItems();
            } else {
                singleClickTimer = setTimeout(function () {
                    singleClickTimer = null;
                    // Handle single click
                    let code = row.children().eq(0).text();
                    let name = row.children().eq(1).text();
                    let unitPrice = row.children().eq(2).text();
                    let qty = row.children().eq(3).text();
                    setDataToItemTxtFields(code, name, unitPrice, qty);
                    $(".card-body").collapse("show");
                    $(".card-body")[0].scrollIntoView({ behavior: "smooth", block: "center" });
                }, 300); // Adjust the delay (300 milliseconds) as needed
            }
        }
    });
}


function loadAllItemsId() {
    $('#itemIdOption').empty();
    for (let itemArElement of items) {
        $('#itemIdOption').append(`<option>${itemArElement.id}</option>`);
    }
}