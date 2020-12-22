$(document).on('click', '.navbar a', function () { $('.navbar-collapse').collapse('hide'); });

$(document).on('DOMContentLoaded', LoadMenu);
$(document).on('click', '#nav-home', LoadHome);
$(document).on('click', '#nav-contact', LoadContact);
$(document).on('click', '#nav-login', LoadLogin);
$(document).on('click', '#nav-register', LoadRegister);
$(document).on('click', '#nav-search', LoadSearch);
$(document).on('click', '#nav-cart', LoadCart);
$(document).on('click', '#nav-product', LoadProduct);
$(document).on('click', '#nav-category', LoadProduct);
$(document).on('click', '#nav-sex', LoadProduct);
$(document).on('click', '#nav-age', LoadProduct);
$(document).on('click', '#nav-action', LoadProduct);
$(document).on('click', '#nav-puzzle', LoadProduct);
$(document).on('click', '#nav-outdoor', LoadProduct);
$(document).on('click', '#nav-vehicle', LoadProduct);
$(document).on('click', '#nav-boy', LoadProduct);
$(document).on('click', '#nav-girl', LoadProduct);
$(document).on('click', '#nav-unisex', LoadProduct);
$(document).on('click', '#nav-0-year', LoadProduct);
$(document).on('click', '#nav-1-year', LoadProduct);
$(document).on('click', '#nav-3-year', LoadProduct);
$(document).on('click', '#nav-6-year', LoadProduct);

$(document).ready(LoadHome);

$(document).on('submit', '#frm-login', Login);
$(document).on('submit', '#frm-register', Register);

function LoadMenu() { $('#navbar').load('menu.html'); }
function LoadHome() { $('#main').load('home.html'); MenuActive($('nav #nav-home'), 'Home'); }
function LoadContact() { $('#main').load('contact.html'); MenuActive($('nav #nav-contact'), 'Contact'); }
function LoadLogin() { $('#main').load('login.html'); MenuActive($('nav #nav-login'), 'Login'); }
function LoadRegister() { $('#main').load('register.html'); MenuActive($('nav #nav-login'), 'Register'); }
function LoadCart() { $('#main').load('cart.html'); MenuActive($('nav #nav-cart'), 'Cart'); }
function LoadSearch() { $('#frm-search-container').toggle('slow'); }

function MenuActive(element, title) {
    $('nav').find('.active').removeClass('active');
    element.addClass('active');
    document.title = title;
}

function GetCategory(subcategory) {
    switch (subcategory) {
        case 'action': case 'puzzle': case 'outdoor': case 'vehicle':
            return 'category';

        case 'boy': case 'girl': case 'unisex':
            return 'sex';

        case '0-year': case '1-year': case '3-year': case '6-year':
            return 'age';

        default: return '';
    }
}

function LoadProduct(e) {
    $('#main').load('product.html', function (response, status, xhr) {
        if (status == 'success') {
            var category, subcategory = e.target.id.substring(4, e.target.id.length).trim();

            switch (subcategory) {
                case 'product':
                    category = ''; subcategory = '';
                    MenuActive($('nav #nav-product'), 'All Products');
                    break;

                case 'category': case 'sex': case 'age':
                    category = subcategory;
                    subcategory = '';
                    break;

                default:
                    category = GetCategory(subcategory);
            }

            $('#breadcrumb-product-detail').empty();
            $('#breadcrumb-product-detail').append('<li class="breadcrumb-item"><a href="#" id="nav-product">All Products</a></li>');

            if (category) {
                var category_title = category.charAt(0).toUpperCase() + category.slice(1);
                $('#breadcrumb-product-detail').append(`<li class="breadcrumb-item"><a href="#" id="nav-${category}">${category_title}</a></li>`);

                MenuActive($(`nav #nav-${category}`), category_title);
            }

            if (subcategory) {
                var subcategory_title = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
                $('#breadcrumb-product-detail').append(`<li class="breadcrumb-item"><a href="#" id="nav-${subcategory}">${subcategory_title}</a></li>`);

                MenuActive($(`nav #nav-${subcategory}`), subcategory_title);
            }

            $.ajax({
                type: 'POST',
                url: '../php/product.php',
                data: {
                    category: category,
                    subcategory: subcategory
                },
                success: function (result) {
                    result = $.parseJSON(result);

                    ShowProduct(result);
                }
            });
        }
    });
}

function ShowProduct(products) {
    $('#product-list').empty();
    var text = '';

    if (Object.keys(products).length === 0) {
        text += `<div>No product.</div>`;
    } else {
        for (item of products) {
            var price = parseFloat(item.price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

            text += `<div class='col-6 col-md-4 col-lg-3 col-xl-2 text-center product'>
                        <div data-product-id='${item.id}' id='product-img'>
                            <img src='${item.image}' alt='${item.name}' style='width: 100%; height: 100%;'>
                        </div>

                        <div class='mt-4'>
                            <p class='mb-0 pb-0'><small><strong>${item.name}</strong></small></p>
                            <p class='mt-1 pt-0'><small>${price} VNĐ</small></p>
                        </div>
                     </div>`;
        }
    }

    $('#product-list').append(text);
}

$(document).on('click', '#product-list #product-img', ViewDetails);

function ViewDetails() {
    var product_id = $(this).data('product-id');

    $.ajax({
        type: 'POST',
        url: '../php/detail.php',
        data: { id: product_id },
        success: function (result) {
            result = $.parseJSON(result);

            $('#product-list').empty();
            $('#product-detail').load('detail.html', result[0], function (response, status, xhr) {
                if (status == 'success') {
                    document.title = result[0].name;
                    $('#breadcrumb-product-detail').append(`<li class="breadcrumb-item active" aria-current="page">${result[0].name}</li>`);

                    $('#product-detail #img-a-1').attr('href', result[0].img);
                    $('#product-detail #img-1a').attr('src', result[0].img);
                    $('#product-detail #img-1b').attr('src', result[0].img);

                    $('#product-detail #img-a-2').attr('href', result[0].img);
                    $('#product-detail #img-2a').attr('src', result[0].img);
                    $('#product-detail #img-2b').attr('src', result[0].img);

                    $('#product-detail #img-a-3').attr('href', result[0].img);
                    $('#product-detail #img-3a').attr('src', result[0].img);
                    $('#product-detail #img-3b').attr('src', result[0].img);

                    $('#product-detail #img-a-4').attr('href', result[0].img);
                    $('#product-detail #img-4a').attr('src', result[0].img);
                    $('#product-detail #img-4b').attr('src', result[0].img);

                    $('#product-detail #name').text(result[0].name);
                    $('#product-detail #price').text(result[0].price);
                }
            });
        }
    });
}

function Login(e) {
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url: '../php/login.php',
        data: $('#frm-login').serialize(),
        success: function (result) {
            result = $.parseJSON(result);

            if (result.success) {
                $('#frm-login').trigger('reset');
                location.href = 'product.html';
            } else {
                alert('Login unsuccessfully!');
            }
        }
    });
}

function Register(e) {
    e.preventDefault();

    if ($('#password').val() === $('#confirm-password').val()) {
        $.ajax({
            type: 'POST',
            url: '../php/register.php',
            data: $('#frm-register').serialize(),
            success: function (result) {
                result = $.parseJSON(result);

                if (result.success) {
                    alert('Registered successfully!');
                    $('#frm-register').trigger('reset');
                    location.href = 'login.html';
                } else {
                    alert('Registered unsuccessfully!');
                }
            }
        });
    } else {
        $('#error').text('* Password mismatched.\n');
    }
}