
/*---------spa-----------*/
$('.order-section').hide();
$('#item-section').hide();
$('#customer-section').hide();

$('#home-btn').on('click', () =>{
    $('#homediv').show();
    $('.order-section').hide();
    $('#item-section').hide();
    $('#customer-section').hide();
});

$('#order-btn').on('click', () =>{
    $('#homediv').hide();
    $('#item-section').hide();
    $('#customer-section').hide();
    $('.order-section').show();
});

$('#item-btn').on('click', () =>{
    $('#homediv').hide();
    $('.order-section').hide();
    $('#customer-section').hide();
    $('#item-section').show();
});

$('#customer-btn').on('click', () =>{
    $('#homediv').hide();
    $('.order-section').hide();
    $('#item-section').hide();
    $('#customer-section').show();

});

/*validate field*/


$('#customerID').on('keyup', function(event) {
    var cusid = $('#customerID').val();
    var cusidPattern = /^C\d{2}-\d{3}$/;
    var errorMessage = $('.errorMessageId');

    if (!cusidPattern.test(cusid)) {
        errorMessage.show();
        $('#customerID').css({'border': '2px solid red'});
    } else {
        errorMessage.hide();
        $('#customerID').css({'border': '2px solid green'});
        $('#customerName').focus();
    }
});

function checkNameField() {
    var cusName = $('#customerName').val();
    var cusNamePattern = /^\s*\S.{3,18}\S\s*$/;
    var errorMessageName=$('.errorMessageName');

    if (!cusNamePattern.test(cusName)) {
        errorMessageName.show();
        $('#customerName').css({'border': '2px solid red'});
    } else {
        errorMessageName.hide();
        $('#customerName').css({'border': '2px solid green'});
        $('#customerAddress').focus();
    }
}

function checkFieldAddress() {
    var cusAddress = $('#customerAddress').val();
    var cusAddressPattern = /^.{5,}$/;
    var errorMessageAddress = $('.errorMessageAddress');

    if (!cusAddressPattern.test(cusAddress)) {
        errorMessageAddress.show();
        $('#customerAddress').css('border', '2px solid red');
    } else {
        errorMessageAddress.hide();
        $('#customerAddress').css('border', '2px solid green');
        $('#customerSalary').focus();
    }

}

function checkFieldSalary() {
    var cusSalary = $('#customerSalary').val();
    var cusSalaryPattern = /^(?:\d+|\d+\.\d{2})$/;
    var errorMessageSalary = $('.errorMessageSalary');

    if (!cusSalaryPattern.test(cusSalary)) {
        errorMessageSalary.show();
        $('#customerSalary').css('border', '2px solid red');
    } else {
        errorMessageSalary.hide();
        $('#customerSalary').css('border', '2px solid green');
    }
}

function checkFieldItemId() {
    var itemId = $('#IID').val();
    var itemIdPattern = /^I\d{2}-\d{3}$/;
    var errorMessageItemId = $('.errorMessageItemId');

    if (!itemIdPattern.test(itemId)) {
        errorMessageItemId.show();
        $('#IID').css('border', '2px solid red');
    } else {
        errorMessageItemId.hide();
        $('#IID').css('border', '2px solid green');
        $('#IName').focus();
    }
}

function checkFieldItemName() {
    var itemName = $('#IName').val();
    var ItemNamePattern = /^\s*\S.{3,18}\S\s*$/;
    var errorMessageItemName = $('.errorMessageItemName');

    if (!ItemNamePattern.test(itemName)) {
        errorMessageItemName.show();
        $('#IName').css('border', '2px solid red');
    } else {
        errorMessageItemName.hide();
        $('#IName').css('border', '2px solid green');
        $('#IPrice').focus();
    }
}

function checkFieldItemPrice() {
    var itemPrice = $('#IPrice').val();
    var ItemPricePattern  = /^(?:\d+|\d+\.\d{2})$/;
    var errorMessageItemPrice = $('.errorMessageItemPrice');

    if (!ItemPricePattern.test(itemPrice)) {
        errorMessageItemPrice.show();
        $('#IPrice').css('border', '2px solid red');
    } else {
        errorMessageItemPrice.hide();
        $('#IPrice').css('border', '2px solid green');
        $('#Iquentity').focus();
    }
}

function checkFieldItemSubTotal() {
    var itemPrice = $('#IPrice').val();
    var ItemPricePattern  = /^(?:\d+|\d+\.\d{2})$/;
    var errorMessageItemPrice = $('.errorMessageItemPrice');

    if (!ItemPricePattern.test(itemPrice)) {
        errorMessageItemPrice.show();
        $('#IPrice').css('border', '2px solid red');
    } else {
        errorMessageItemPrice.hide();
        $('#IPrice').css('border', '2px solid green');
        $('#Iquentity').focus();
    }
}

function checkFieldItemQty() {
    var itemQty = $('#Iquentity').val();
    var itemQtyPattern = /^\d+$/;
    var errorMessageItemQty = $('.errorMessageItemQty');

    if (!itemQtyPattern.test(itemQty)) {
        errorMessageItemQty.show();
        $('#Iquentity').css('border', '2px solid red');
    } else {
        errorMessageItemQty.hide();
        $('#Iquentity').css('border', '2px solid green');
    }
}