$(document).ready(function() {
  $("#menu-toggle").click(function() {
    $("header nav ul").toggleClass("open");
  });

  $("header nav ul li").click(function() {
    $("header nav ul").toggleClass("open");
  });
});
