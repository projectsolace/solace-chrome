$(document).ready(function(){
  let email  = $(".email").val();
  let passowrd = $(".password").val();

  $('#loginForm').submit(function(){
      $.ajax({
        type: "POST",
        data: $(this).serialize(),
        url: "https://solace-admin.herokuapp.com/api/tokens/sessions/create",
        success: function(data){

          $('body').html('<div class="form-group col-md-4"> <label for="text">What"s on your mind today: </label> <textarea class="form-control" rows="6" id="comment"></textarea><button type="button" class="btn btn-success finish-button">Finish</button></div>');
        },
        error: function() {
          $(".container").prepend("<div class = 'invalid'>Invalid Credential</div>")
        }
      });
      return false;
  })
});