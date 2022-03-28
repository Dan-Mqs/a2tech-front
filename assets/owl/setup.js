$('.owl-carousel').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
    dots: false,
    lazyLoad: true,
    responsive:{
        0: {
            items:2
        },        
        750: {
            items:3
        },
        1040:{
            items:4
        },
        1280:{
            items:5
        },
        1600:{
            items:6
        },
        1920:{
            items:7
        },
    }
})