$(document).ready(function () {

    $('.calc__filials').change(function () {
        if ($(this).val() < 0) {
            $(this).val(0);
        }
        calculation();
    });

    $('.calc__table').on("click", ".calc__delete", function () {
        $(this).parent().parent().remove();
        calculation();
    });

    $('.calc__line--add').click(function () {
        correction();
        $('.drop').addClass("drop--show");
        $('.calc__black').addClass("calc__black--show");
    });

    $('.calc__black').click(function () {
        $('.drop').removeClass("drop--show");
        $('.calc__black').removeClass("calc__black--show");
    });


    $('.drop__item').each(function () {
        let drop_name = "drop__item--" + $(this).data("name");
        $(this).addClass(drop_name);
    });

    function correction() {
        $('.drop__item').each(function () {
            let drop_name = ".drop__item--" + $(this).data("name");
            let line_name = ".calc__line--" + $(this).data("name");
            if ($(line_name).length > 0) {
                $(drop_name).css({display: "none"});
            } else {
                $(drop_name).css({display: "block"});
            }
        });
    }

    $('.drop__item').click(function () {
        setTimeout(() => {
            $('.drop').removeClass("drop--show");
            $('.calc__black').removeClass("calc__black--show");
        }, 10);

        let drop_price1 = $(this).data("price1");
        let drop_price2 = $(this).data("price2");
        let line_name = "calc__line--" + $(this).data("name");
        let line_img = $(this).data("name");
        let line_tip = $(this).data("tip");
        let line_place = $(this).data("tip");

        $(".calc__table").append(`
			<div data-place="${line_place}" class="calc__line calc__line--calc ${line_name}">
				<div class="calc__part">
					<div class="calc__delete"></div>
					<img src="img/${line_img}.png" alt="" class="calc__img">
					<div class="calc__tip">
						<div class="calc__sign">?</div>
						<div class="calc__fly">Размещение отзыва не сервисе ${line_tip} с гарантией публикации 1 мес*</div>
					</div>
				</div>
				<div class="calc__head730">
					<div class="calc__text">Кол-во отзывов</div>
					<div class="calc__text">Стоимость</div>
				</div>
				<div class="calc__between">
					<div class="calc__plusminus">
						<div class="calc__minus">–</div>
						<input class="calc__input" type="text" value="0">
						<div class="calc__plus">+</div>
					</div>
					<div id="calc_price_1" style="display: none;">${drop_price1}</div>
					<div id="calc_price_2" style="display: none;">${drop_price2}</div>
					<div class="calc__text calc__text--price">0 руб.</div>
				</div>
			</div>
		`);
        calculation();
    });

    calculation();

    function isWholesalePrice(val, sign, compare_value) {
        switch (sign) {
            case ">":
                return val > compare_value;
            case ">=":
                return val >= compare_value;
            case "=":
                return val == compare_value;
            case "<=":
                return val <= compare_value;
            case "<":
                return val < compare_value;
            default:
                return true;
        }
    }

    function calculation() {


        if ($('.calc__line--calc').length == $('.drop__item').length) {
            $('.calc__line--add').css({display: "none"});
        } else {
            $('.calc__line--add').css({display: "flex"});
        }

        var calc_itog = 0;
        var calc_filials = $('#calc_filials').val();
        // if (calc_filials > 10) {
        if (isWholesalePrice($('#calc_filials').val(), $('#calc_filials').data('wholesaleCompareSign'), $('#calc_filials').data('wholesaleCompareVal'))) {
            var calc_filials_price = calc_filials * $('#calc_filials').data("price2");
        } else {
            var calc_filials_price = calc_filials * $('#calc_filials').data("price1");
        }


        $('.calc__line--calc').each(function () {

            let calc_price_1 = $(this).find("#calc_price_1").text();
            let calc_price_2 = $(this).find("#calc_price_2").text();


            // if ($(this).find(".calc__input").val() < 11) {
            if (isWholesalePrice($(this).find(".calc__input").val(), $(this).data('wholesaleCompareSign'), $(this).data('wholesaleCompareVal'))) {
                var calc_current = calc_price_1 * $(this).find(".calc__input").val();
                $(this).find(".calc__text--price").text(calc_current.toFixed(0) + " руб.");
            } else {
                var calc_current = calc_price_2 * $(this).find(".calc__input").val();
                $(this).find(".calc__text--price").text(calc_current.toFixed(0) + " руб.");
            }

            calc_itog = +calc_itog + +calc_current;

            var calc_place_ARR = [];
            var calc_value_ARR = [];
            var calc_data = "";

            $('.calc__line--calc').each(function () {

                let calc_place = $(this).data("place");
                calc_place_ARR.push(calc_place);


                let calc_value = $(this).find(".calc__input").val();
                calc_value_ARR.push(calc_value);

                calc_data = calc_data + calc_place + ": " + calc_value + " отзывов" + "<br>" + " \n";

            });

            if (calc_itog == 0) {
                $('.calc__result').text(0 + " руб");
            } else {
                $('.calc__result').text((+calc_itog + +calc_filials_price).toLocaleString("eu") + " руб");
            }

            $('#form_data').val(
                "Филиалов: " + calc_filials + "<br>" + " \n" +
                calc_data +
                "Итого: " + $('.calc__result').text()
            );

        });


    }

    $('.form__file').click(function () {
        $('#form_file').click();
    });


    $(function () {
        $("#form_phone").mask("(999) 999-99-99", {placeholder: "__________"});
    });

    $('.calc__table').on("click", ".calc__minus", function () {
        $(this).next().val(+$(this).next().val() - 1);
        if ($(this).next().val() < 0) {
            $(this).next().val(0);
        }
        calculation();
    });

    $('.calc__table').on("click", ".calc__plus", function () {
        $(this).prev().val(+$(this).prev().val() + 1);
        calculation();
    });

    $('.calc__table').on("change", ".calc__input", function () {
        if ($(this).val() < 0) {
            $(this).val(0);
        }
        if ($(this).val() == "") {
            $(this).val(0);
        }
        calculation();
    });


});