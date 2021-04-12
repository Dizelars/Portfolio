const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      scrollTo = document.querySelectorAll('.menu__list a');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

scrollTo.forEach(function(e) {
    e.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

const counters = document.querySelectorAll('.skills__ratings-counter'),
      lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

$(document).ready(function(){
    $("a[href^='#']").on('click', function() {
        let href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 600,   // по умолчанию «400» 
            easing: "linear" // по умолчанию «swing» 
        });
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Validate

    function valideForm(form) {
        $(form).validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    email: true
                },
                privacy: "required"
            },
            messages: {
                name: "Введите свое имя!",
                email: {
                    required: "Введите свою почту!",
                    email: "Неверный адрес почты!"
                },
                privacy: "Важно!"
            }
        });
    }
    valideForm('#feedback');

    $('#feedback').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('.modal-wrapper').toggleClass('open');
            $('section').toggleClass('blur-it');
            $('#feedback').trigger('reset');
        });
        return false;
    });

    $('.trigger').on('click', function() {
        $('.modal-wrapper').toggleClass('open');
        $('section').toggleClass('blur-it');
        return false;
    });
});
