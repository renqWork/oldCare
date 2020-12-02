import "bootstrap";
import "./index.scss";
import "./index.html";

$(function () {
  $("#myCarousel").carousel({
    interval: 5000,
  });
  $("#myCarousel2").carousel({
    interval: 5000,
  });

  //首先将#btn隐藏
  $(".top").hide();
  //当滚动条的位置处于距顶部50像素以下时，跳转链接出现，否则消失
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 50) {
      $(".top").fadeIn();
    } else {
      $(".top").fadeOut();
    }
  });
  $(".top").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });
});
