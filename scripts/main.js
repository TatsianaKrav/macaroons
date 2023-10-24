$(document).ready(function () {


    $('#mainBtn').click(() => {
        $('.products')[0].scrollIntoView({behavior: "smooth"});
    });

    $('.btn').click((e) => {
        console.log($(e.target).parents('.product').find('.product-title').text());
         $('#choice').val($(e.target).parents('.product').find('.product-title').text());
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    })

    $('#submit').click(() => {
        let choice = $('#choice');
        let name = $('#name');
        let phone = $('#phone');
        let hasError = false;
        let loader = $('.loader');

        $('.error-input').hide();
        $('input').css('border', '1px solid rgb(130, 19, 40)').css('margin-bottom', '40px');


        if (!choice.val()) {
            choice.next().show();
            choice.css('margin-bottom', '0')
                .css('border', '1px solid red');
            hasError = true;
        }
        if (!name.val() || name.val().match(/^[A-Za-zА-Яа-яЁё]+$/) === null) {
            name.next().show();
            name.css('margin-bottom', '0')
                .css('border', '1px solid red');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('margin-bottom', '0')
                .css('border', '1px solid red');
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {product: choice.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success === 0) {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                        $('.form')[0].reset();
                    } else if (msg.success === 1) {
                        $('.form-title').remove();
                        $('.form-info').remove();
                        $('form').remove();
                        $('.success-message').css('display', 'block');
                        $('.order-form')
                            .css('display', 'flex')
                            .css('align-items', 'center')
                            .css('justify-content', 'center')
                    }
                });
        }
    })

    $("#phone").mask("+999(99) 999-99-99");

    $('#burger').click(function () {
        $('#menu').addClass('open');
    })
    $('#menu *').click(() => {
        $('#menu').removeClass('open');
    })


})