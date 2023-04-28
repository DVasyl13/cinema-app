const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    cssMode: "on",
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },


    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

