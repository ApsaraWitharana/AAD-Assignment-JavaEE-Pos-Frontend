import customerModel from '/model/customerModel.js';
import {customer} from '/db/db.js';

var recordIndex;
$(document).ready(function () {
    getAllCustomers(); // Corrected function name

    $(".save_btn").click(function () {
        if (checkAll()) {
            saveCustomer();
        } else {
            alert("Error");
        }
    });

    // Other event handlers...
    clearField();
});

function getAllCustomers() {
    $("#customerTable").empty();

    $.ajax({
        url: "",
        method: "GET",
        dataType: "json",
        success: function (res) {
            var rows = "";
            $.each(res.data, function (index, c) {
                let customerId = c.id;
                let customerName = c.name;
                let customerAddress = c.address;
                let customerSalary = c.salary;
                let row = "<tr><td>" + customerId + "</td><td>" + customerName + "</td><td>" + customerAddress + "</td><td>" + customerSalary + "</td></tr>";
                rows += row;
                console.log(JSON.stringify(res))
            });
            $("#customerTable").append(rows);
        },
        error: function (xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

function loadTable(){
    $('#customerTable').empty();

    customer.map((item, index) => {
        let record = `
            <tr>
                <td class="customer-id-value">${item.id}</td>
                <td class="customer-name-value">${item.name}</td> 
                <td class="customer-address-value">${item.address}</td>
                <td class="customer-salary-value">${item.salary}</td> 
            </tr>`;
        $("#customerTable").append(record);
    });
}

$(".save_btn").on('click', () => {

    let alertConfrim = confirm('Do you want to add this customer ??');
    if (alertConfrim==true) {

        var customerID = $('#customerID').val();
        var customerName = $('#customerName').val();
        var customerAddress = $('#customerAddress').val();
        var customerSalary = $('#customerSalary').val();

        let customerObj = new customerModel(
            customerID, customerName, customerAddress, customerSalary
        );

        customer.push(customerObj);

        loadAllCustomerId();
        loadTable();
        clearField();
    }else {
        clearField();
    }
});

$("#customerTable").on('click', 'tr', function() {
    let index = $(this).index();
    recordIndex = index;

    let id = $(this).find(".customer-id-value").text();
    let name = $(this).find(".customer-name-value").text();
    let address = $(this).find(".customer-address-value").text();
    let salary = $(this).find(".customer-salary-value").text();


    $("#customerID").val(id);
    $("#customerName").val(name);
    $("#customerAddress").val(address);
    $("#customerSalary").val(salary);
});
$("#customerTable").on('dblclick','tr',function() {
    let alertConfrimDelete = confirm('Do you want to delete this customer??');
    if (alertConfrimDelete==true) {
        let index = $(this).index();
        recordIndex = index;
        $('.delete_btn').click;
    }
});


$(".delete_btn").on('click', () => {
     alert("Do you want to delete this customer??")
    customer.splice(recordIndex, 1);
    loadTable();
    clearField();
});

//  function deleteCustomer(id, button, customers) {
//                     if (confirm(`Are you sure you want to delete customer ${id}?`)) {
//                         const index = customers.findIndex(customer => customer.id == id);
//                         if (index !== -1) {
//                             customers.splice(index, 1);
//                             const row = button.parentNode.parentNode;
//                             row.remove();
//                         }
//                     }
//                 }


function clearField(){
    $("#customerID").val('');
    $("#customerName").val('');
    $("#customerAddress").val('');
    $("#customerSalary").val('');
}

$(".update_btn").on('click', () => {
    alert("Customer update successfuly!!!")
    var customerID = $('#customerID').val();
    var customerName = $('#customerName').val();
    var customerAddress = $('#customerAddress').val();
    var customerSalary = $('#customerSalary').val();

    let customerUpdateObj = customer[recordIndex];
    customerUpdateObj.id=customerID;
    customerUpdateObj.name=customerName;
    customerUpdateObj.address=customerAddress;
    customerUpdateObj.salary=customerSalary

    loadTable();
    clearField();
});
q
function loadAllCustomerId() {
    $('#cusIdOption').empty();
    for (let customerArElement of customer) {
        $('#cusIdOption').append(`<option>${customerArElement.id}</option>`);
    }
}

$("#searchb").on('click', () => {
    alert("Customer search successfuly!!!")
    var customerID = $('#customerID').val();
    var customerName = $('#customerName').val();
    var customerAddress = $('#customerAddress').val();
    var customerSalary = $('#customerSalary').val();

    // let customerUpdateObj = customer[recordIndex];
    // customerUpdateObj.id=customerID;
    // customerUpdateObj.name=customerName;
    // customerUpdateObj.address=customerAddress;
    // customerUpdateObj.salary=customerSalary

    loadAllCustomerId();
    // loadTable();
    // clearField();

});



/*Search Customer*/
// $('#btnSearchButton').click(function () {

//     for (let customerKey of customerAr) {

//         //check the ComboBox Id Equal
//         console.log($('#cusCombo').val());

//         if($('#cusCombo').val()==="ID"){
//             //check Id
//             // alert(customerKey.id+"=="+$('#inputCusSearch').val());

//             if(customerKey.customerID===$('#inputCusSearch').val()){
//                 $('#customerID').val(customerKey.customerID);
//                 $('#customerName').val(customerKey.customerName);
//                 $('#customerSalary').val(customerKey.customerSalary);
//                 $('#customerAddress').val(customerKey.customerAddress);
//             }
//         }else if($('#cusCombo').val()==="1"){
//             //check Name
//             if(customerKey.customerName===$('#inputCusSearch').val()){
//                 $('#customerID').val(customerKey.customerID);
//                 $('#customerName').val(customerKey.customerName);
//                 $('#customerSalary').val(customerKey.customerSalary);
//                 $('#customerAddress').val(customerKey.customerAddress);
//             }
//         }
//     }
// });

