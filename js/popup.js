$(document).ready(function(){
  let email  = $(".email").val();
  let passowrd = $(".password").val();

  chrome.storage.sync.get('id_token', function(result){
    if(result.id_token === undefined || result.id_token === null) {
      $('#login-container').show();
    } else {

      $('.text-form').show();

    }
  });

  $('#loginForm').submit(function(){

    console.log('you have clicked');
      $.ajax({
        type: "POST",
        data: $(this).serialize(),
        url: "https://solace-admin.herokuapp.com/api/tokens/sessions/create",
        success: function(data){

          $('.text-form').show();
          $('#login-container').hide();

          chrome.storage.sync.set({'id_token': data.id_token}, function(){
            console.log('id_token saved in storage');
          });

        },
        error: function() {
          $("#invalid").show();

        }
      });
      return false;
  });

  $('.signout-button').click(function(){
      chrome.storage.sync.remove('id_token', function(){
        console.log('Remove id_token successful');
        $('.text-form').hide();
        $('#login-container').show();
      });
  });
});