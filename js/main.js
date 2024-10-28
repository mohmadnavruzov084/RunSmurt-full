window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu_item"),
    hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    menu.classList.toggle("menu_active");
  });

  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger_active");
      menu.classList.toggle("menu_active");
    });
  });
});

// $(document).ready(function () {
//   $(".carousel__inner").slick({
//     speed: 1200,
//     // adaptiveHeight: true,
//     prevArrow:
//       '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//     nextArrow:
//       '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//     ],
//   });
// });

const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: true,
  action: false,
  controls: false,
  nav: false,
  responsive: [
    {
      640: {
        edgePadding: 10,
        gutter: 20,
        items: 2,
      },
      700: {
        gutter: 30,
      },
      900: {
        items: 3,
      },
    },
  ],
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

$(document).ready(function () {
  $("ul.catolog__tabs").on(
    "click",
    "li:not(.catolog__tab_active )",
    function () {
      $(this)
        .addClass("catolog__tab_active ")
        .siblings()
        .removeClass("catolog__tab_active ")
        .closest("div.container")
        .find("div.catolog__content")
        .removeClass("catolog__content_active")
        .eq($(this).index())
        .addClass("catolog__content_active");
    }
  );
  $(".catolog-item__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catolog-item__content")
        .eq(i)
        .toggleClass("catolog-item__content_active");
      $(".catolog-item__list").eq(i).toggleClass("catolog-item__list_active");
    });
  });

  $(".catolog-item__back").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catolog-item__content")
        .eq(i)
        .toggleClass("catolog-item__content_active");
      $(".catolog-item__list").eq(i).toggleClass("catolog-item__list_active");
    });
  });

  //Modal

  $('[data-modal="consultation"]').on("click", function () {
    $(".overlay,#consultation").fadeIn();
  });
  $(".modal__close").on("click", function () {
    $(".overlay,#consultation,#thanks,#order").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catolog-item__subtitle").eq(i).text());
      $(".overlay,#order").fadeIn("slow");
    });
  });

  //Validate Form

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста введите ваше имя",
          minlength: jQuery.validator.format("Введите  {0} символов!"),
        },
        phone: "Пожалуйста введите ваш номер телефона",
        email: {
          required: "Пожалуйста введите ваш адрес почты",
          email: "Пожалуйста введите корректный адрес почты",
        },
      },
    });
  }
  validateForms("#consultation form");
  validateForms("#consultation-form");
  validateForms("#order form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut;
    }
  });
  $("a[href^='#']").click(function () {
    const _href = $(this).attr("href");
    $("html,body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });
});
