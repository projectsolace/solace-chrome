$(document).ready(function(){
  let email  = $(".email").val();
  let passowrd = $(".password").val();

  $('#loginForm').submit(function(){
      $.ajax({
        type: "POST",
        data: $(this).serialize(),
        url: "https://solace-admin.herokuapp.com/api/tokens/sessions/create",
        success: function(data){

          $('body').html("<h1>Logged in Successful</h1>")
        },
        error: function() {
          alert('Error');
        }
      });
      return false;
  })
});