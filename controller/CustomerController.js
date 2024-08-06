
getAllCustomers();
// import {} from '/model/customer.js';
import {customer} from '/db/db.js';


// var recordIndex;
// $(document).ready(function () {
//     getAllCustomers(); // Corrected function name

//     $(".save_btn").click(function () {
//         if (checkAll()) {
//             saveCustomer();
//         } else {
//             alert("Error");
//         }
//     });

//     // Other event handlers...
//     clearField();
// });


// function loadTable(){
//     $('#customerTable').empty();

//     customer.map((item, index) => {
//         let record = `
//             <tr>
//                 <td class="customer-id-value">${item.id}</td>
//                 <td class="customer-name-value">${item.name}</td> 
//                 <td class="customer-address-value">${item.address}</td>
//                 <td class="customer-salary-value">${item.salary}</td> 
//             </tr>`;
//         $("#customerTable").append(record);
//     });
// }

//save btn action ------------------------------------------------------------------------------------------------------
$(".save_btn").click(function() {
    let id = $("#customerID").val();
    let name = $("#customerName").val();
    let address = $("#customerAddress").val();
    let salary = $("#customerSalary").val();

    let custObj ={
        id: id,
        name: name,
        address: address,
        salary: salary
    }

    let jsonObj = JSON.stringify(custObj);
    $.ajax({
        url: "http://localhost:8080/Pos_System/customer",
        method: "post",
        contentType: "application/json",
        data: jsonObj,
        success: function (resp, textStatus, jqxhr) {
            if(jqxhr.status==201){
                alert("Customer saved successfully!!!");
                getAllCustomers();
                clearField();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status==409){
                alert("Duplicate values. Please check again!!");
                return;
            }else{
                alert("Something happened. Customer not added!!");
            }
        }
        
    });
});

//---------------------------------------------------------

// $("#customerTable").on('click', 'tr', function() {
//     let index = $(this).index();
//     recordIndex = index;

//     let id = $(this).find(".customer-id-value").text();
//     let name = $(this).find(".customer-name-value").text();
//     let address = $(this).find(".customer-address-value").text();
//     let salary = $(this).find(".customer-salary-value").text();


//     $("#customerID").val(id);
//     $("#customerName").val(name);
//     $("#customerAddress").val(address);
//     $("#customerSalary").val(salary);
// });
// $("#customerTable").on('dblclick','tr',function() {
//     let alertConfrimDelete = confirm('Do you want to delete this customer??');
//     if (alertConfrimDelete==true) {
//         let index = $(this).index();
//         recordIndex = index;
//         $('.delete_btn').click;
//     }
// });

///==================**delte btn action**===============

$(".delete_btn").click(function () {
    let id = $("#customerID").val().trim();
    deleteCustomer(id.trim());
     
    

})

//-----------------------------------
function deleteCustomer(id) {
    let customer = findCustomer(id, function (customerId) {
        console.log(customerId);
        if (customerId == undefined) {
            // alert("Customer deleted successfully!!");
            alert("No customer  id: " + id + " found");
        } else {
             $.ajax({
                url: "http://localhost:8080/Pos_System/customer?id="+id,
                method: "delete",
                success: function (resp, textStatus, jqXHR){
                    console.log(resp);

                    if(jqXHR.status==201){
                        alert("Customer deleted successfully!!");
                         clearField();
                        getAllCustomers();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Something happened. Customer not removed");
                }
            });
        }
    });
}

//================**clear text field**========================================



function clearField(){
    $("#customerID").val(''),
    $("#customerName").val(''),
    $("#customerAddress").val(''),
    $("#customerSalary").val(''),
    setBtn();
    $(".fw-bold").css("display", "none");
}

//====================***update btn action ***========================================
$(".update_btn").click (function (){
    
    let id = $('#customerID').val().trim();
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let salary = $('#customerSalary').val();

     let custObj ={
        id: id,
        name: name,
        address: address,
        salary: salary
    }

   let jsonObj = JSON.stringify(custObj);
 $.ajax({
        url: "http://localhost:8080/Pos_System/customer",
        method: "put",
        contentType: "application/json",
        data: jsonObj,
        success: function (resp, textStatus, jqxhr) {
            if(jqxhr.status==201){
                alert("Customer update successfuly!!!")
                loadAllCustomerId();
                clearField();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status==409){
                alert("Duplicate values. Please check again");
                return;
            }else{
                alert("Something happened. Customer not added");
            }
        }
    });
})

//=======================================================================
// q
// function loadAllCustomerId() {
//     $('#cusIdOption').empty();
//     for (let customerArElement of customer) {
//         $('#cusIdOption').append(`<option>${customerArElement.id}</option>`);
//     }
// }
//=============search btn cation ==================
$("#searchb").click (function (){
    let custId = $("#form-control").val();

    alert("Customer search successfuly!!!")
    
    $.ajax({
        url: "http://localhost:8080/Pos_System/customer?function=getById&id="+custId,
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqXHR){
            console.log(resp);

            if(resp.id == undefined){
                alert("No customer  id: " + custId);
                $("#form-control").val("");
                return;
            }
            setDataToTxtFields(resp.id, resp.name, resp.address, resp.contact);
            $("#form-control").val("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
})

//-----------------------------------------------

function findCustomer(id, callback) {
    $.ajax({
        url: "http://localhost:8080/Pos_System/customer?function=getById&id="+id,
        method: "get",
        dataType: "json",
        success: function (resp, textStatus, jqXHR){
            callback(resp.id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            callback(null);
        }
    });
}
//============================================================




function getAllCustomers() {
    $("#customerTable").empty();

    $.ajax({
        url: "http://localhost:8080/Pos_System/customer?function=getAll",
        method: "Get",
        dataType: "json",
        success: function (resp, textStatus, jqxhr) {
            console.log(resp);

            $.each(resp, function(index, customer) {
                let row = `
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.salary}</td>
                    </tr>
                `;
                $("#customerTable").append(row);
            });
            onTblRowClick();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


//----------------------------------------------

function onTblRowClick() {
    let singleClickTimer;

    $("#customerTable>tr").on("mousedown", function (event) {
        if (event.which === 1) { // Left mouse button (1) clicked
            let row = $(this);
            if (singleClickTimer) {
                clearTimeout(singleClickTimer);
                singleClickTimer = null;
                //  double click
                deleteCustomer(row.children().eq(0).text());
                getAllCustomers();
            } else {
                singleClickTimer = setTimeout(function () {
                    singleClickTimer = null;
                    //  single click
                    let id = row.children().eq(0).text();
                    let name = row.children().eq(1).text();
                    let address = row.children().eq(2).text();
                    let contact = row.children().eq(3).text();
                    setDataToTxtFields(id, name, address, contact);
                    $(".delete_btn").prop("disabled", false);
                    $(".card-body").collapse("show");
                    $(".card-body")[0].scrollIntoView({ behavior: "smooth", block: "center" });
                }, 300); // Adjust the delay (300 milliseconds) as needed
            }
        }
    });
}
//===========================

function setDataToTxtFields(id,name,address,contact){
    $(".card-body").collapse("show");
      $("#customerID").val(id);
    $("#customerName").val(name);
    $("#customerAddress").val(address);
    $("#customerSalary").val(salary);

    $("#customerID,#customerName,#customerAddress,#customerSalary").addClass("border-secondary-subtle");
    setBtn();
    $(".delete_btn").prop("disabled", false);
}
