$(document).ready(()=>{
    
    var hash = location.hash.substr(1);
    // alert(hash)
    if(hash != ''){
        $('.article').load('./content/'+ hash +'.html');
        $('.nav__link').removeClass('nav__link-active');
        $('.'+ hash +'Link').addClass('nav__link-active');
    } else {
        $('.article').load('./content/bio.html');
        $('.nav__link').removeClass('nav__link-active');
    }

    window.onpopstate = function(event) {
        var hash = location.hash.substr(1);
        if(hash != ''){
            $('.article').load('./content/'+ hash +'.html');
            $('.nav__link').removeClass('nav__link-active');
            $('.'+ hash +'Link').addClass('nav__link-active');
        } else {
            $('.article').load('./content/bio.html');
            $('.nav__link').removeClass('nav__link-active');
        }
    };

    $('.nav__link').each((i, obj)=>{
        $(obj).on('click',()=>{
            $('.nav__link').removeClass('nav__link-active')
            $(obj).addClass('nav__link-active')
        })

    })

    if (localStorage.getItem('chose-theme') == null) localStorage.setItem('chose-theme','dark')
    const currentTheme = localStorage.getItem('chose-theme');
    $(document.body).attr("data-theme", currentTheme)
    if(currentTheme == 'dark'){
        $('#theme').html('<i class="fas fa-sun"></i>')
    } else {
        $('#theme').html('<i class="fas fa-moon"></i>')
    }

    $('#theme').click(()=>{
        $('.nav__theme').addClass('nav__theme-active')
        let newTheme = localStorage.getItem('chose-theme') == 'dark' ? 'light' : 'dark'
        $(document.body).attr("data-theme", newTheme)
        localStorage.setItem('chose-theme', newTheme)
        if(newTheme == 'dark'){
            $('#theme').html('<i class="fas fa-sun"></i>')
        } else {
            $('#theme').html('<i class="fas fa-moon"></i>')
        }
    })

    $('.nav__theme').on('transitionend webkitTransitionEnd oTransitionEnd',()=>{
        $('.nav__theme').removeClass('nav__theme-active')
    })

    $('.nav__sub-items').click(()=>{
        $('.nav__sub-menu').toggleClass('nav__sub-menu-active')
    })
})