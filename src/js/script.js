$(document).ready(function() {
 $("#readFile").click(function() {
    $.get('data.txt', function(data) {
      $("#container").html(data);
    }, 'text');
 });
});