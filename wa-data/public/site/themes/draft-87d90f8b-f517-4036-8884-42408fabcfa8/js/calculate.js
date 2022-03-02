let filials_price = 500;

let reviews = {
    yandex: {
        title: 'Яндекс',
        img: '/wa-data/public/site/themes/default/img/calculate/yandex_logo.svg',
        enable: true,
        price: 750,
        reviews_for_discount: 11,
        price_discount: 600,
        description: '',
        calc_enable: true,
        calc_count: 0,
    },
    google: {
        title: 'Google',
        img: '/wa-data/public/site/themes/default/img/calculate/google.svg',
        enable: true,
        price: 700,
        reviews_for_discount: 11,
        price_discount: 560,
        description: '',
        calc_enable: true,
        calc_count: 0,

    },
    zoon: {
        title: 'Zoon',
        img: '/wa-data/public/site/themes/default/img/calculate/zoon.svg',
        enable: true,
        price: 600,
        reviews_for_discount: 11,
        price_discount: 480,
        description: '',
        calc_enable: true,
        calc_count: 0,

    },
    gis: {
        title: '2GIS',
        img: '/wa-data/public/site/themes/default/img/calculate/2GIS_logo.svg',
        enable: true,
        price: 600,
        reviews_for_discount: 11,
        price_discount: 480,
        description: '',
        calc_enable: true,
        calc_count: 0,

    },
    prodoctor: {
        title: 'Продокторов',
        img: '/wa-data/public/site/themes/default/img/calculate/pro_prodoctorov.svg',
        enable: true,
        price: 600,
        reviews_for_discount: 11,
        price_discount: 500,
        description: '',
        calc_enable: true,
        calc_count: 0,

    },
};
renderSelectReview();



function addRow(id) {
    let i = reviews[id];
    let html = `
        <div class="row" data-id="${id}">
            <div class="col-12 col-md-5 type_platform_reviews">
                <span class="review-icon review-minus" onclick="deleteRow('${id}')"></span>
                <img width="100%" class="img-${id}" src="${i.img}" alt="">
                <span class="review-icon review-question"></span>
            </div>
            <div class="col-12 col-md-4">
                <div class="count_wrapper">
                    <span onclick="count_dec('${id}')">-</span>
                    <input oninput="onInputCount('${id}')" type="number" id="" value="${i.calc_count}" min="0">
                    <span onclick="count_inc('${id}')">+</span>
                </div>
            </div>
            <div class="col-12 col-md-3">
               <span class="total-price-platform"></span>
            </div>
    </div>`;

    document.getElementById('platform-wrapper').insertAdjacentHTML('beforeend', html);
    reviews[id].calc_enable = true;
    renderSelectReview();
    updateTotalRow(id);
}

function deleteRow(id) {
    reviews[id].calc_enable = false;
    let temp = document.querySelector('#platform-wrapper div[data-id*=' + id + ']');
    temp.remove();
    renderSelectReview();
}


function renderSelectReview() {
    let html = '';


    for (i in reviews) {
        if (reviews[i].enable && !reviews[i].calc_enable) {
            html += `<li onclick="addRow('${i}')" data-platform="${i}"><img src="${reviews[i].img}" alt=""> ${reviews[i].title}</li>`;
        }


    }


    document.querySelector('#select-review>ul').innerHTML = html;
    /*document.getElementById('select-review').classList.toggle('select-review-open');*/

}

function selectReviewPlatform() {
    document.getElementById('select-review').classList.toggle('select-review-open');


}

function count_dec(id) {
    let temp = document.querySelector('#platform-wrapper div[data-id*=' + id + '] input');
    if (parseInt(temp.value) >= 1) {
        temp.value = parseInt(temp.value) - 1;
        reviews[id].calc_count = parseInt(temp.value);
        updateTotalRow(id);
    }


}

function count_inc(id) {
    let temp = document.querySelector('#platform-wrapper div[data-id*=' + id + '] input');

    temp.value = parseInt(temp.value) + 1;
    reviews[id].calc_count = parseInt(temp.value);
    updateTotalRow(id);
}

function totalRow(id) {
    let i = reviews[id];
    let price = i.price;
    let total = 0;

    if (i.calc_count >= i.reviews_for_discount) price = i.price_discount;

    if (i.enable == true && i.calc_enable == true){
        total = i.calc_count * price;
    }

    return total;
}

function updateTotalRow(id){
    let total = totalRow(id);

    let temp = document.querySelector('#platform-wrapper div[data-id*=' + id + '] .total-price-platform');

    temp.innerHTML = total;
    updateGetTotal();
}

function onInputCount (id){
    let temp = document.querySelector('#platform-wrapper div[data-id*=' + id + '] input');
    if (parseInt(temp.value) < 0 ) {
        temp.value = 0;
    }
    if (parseInt(temp.value) >= 0 ){
        reviews[id].calc_count = parseInt(temp.value);
        updateTotalRow(id);
    }

}

function onInputFilialsCount (){
    let temp = document.querySelector('input#filials');
    if (parseInt(temp.value) < 1 ) {
        temp.value = 1;
    }
    if (parseInt(temp.value) >= 0 ){
        updateGetTotal();
    }

}


function getTotal(){
    let total = 0;
    for (id in reviews){
        if (reviews[id].calc_enable == true) {
            total = total + totalRow(id);
        }
    }
    let temp = document.querySelector('input#filials');
    total = total + parseInt(temp.value) * filials_price ;


    return total;
}

function updateGetTotal(){
    let total = getTotal();

    let temp = document.querySelector('#total');

    temp.innerHTML = total;
}




for (id in reviews){
    if (reviews[id].calc_enable == true) {
        addRow(id);
    }
}