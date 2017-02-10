$(document).ready(function(){
  let email  = $(".email").val();
  let passowrd = $(".password").val();

  $('#loginForm').submit(function(){
      $.ajax({
        type: "POST",
        data: $(this).serialize(),
        url: "https://solace-admin.herokuapp.com/api/tokens/sessions/create",
        success: function(data){

          $('.text-form').show();
          $('#login-container').hide();
        },
        error: function() {
          $("#invalid").show();

        }
      });
      return false;
  })
});