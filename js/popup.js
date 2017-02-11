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

  $('#comment').focus(function(){
    $('#watson-posted').hide();
  });

  $('#loginForm').submit(function(){

      $.ajax({
        type: "POST",
        data: $(this).serialize(),
        url: "https://solace-admin.herokuapp.com/api/tokens/sessions/create",
        success: function(data){

          $('.text-form').show();
          $('#login-container').hide();

          console.log('successful sign in here is data', data.user)
          chrome.storage.sync.set({'id_token': data.id_token, 'user': data.user}, function(){
            console.log('id_token saved in storage');
          });

        },
        error: function() {
          $("#invalid").show();

        }
      });
      return false;
  });

  $('#signout-button').click(function(){
      chrome.storage.sync.remove(['id_token', 'user'], function(){
        console.log('Sign out successful');
        $('#comment').val('');
        $('.text-form').hide();
        $('#login-container').show();
        $("#invalid").hide();
        $('form').trigger('reset');

      });
  });

  $('#finish-button').click(function(){

    var comment = $('#comment').val();
    $('#watson-posted').hide();
    chrome.storage.sync.get('user', function(result){

      if(result.user) {
         $.ajax({
            type: "POST",
            data: {text: comment, userID: result.user.id},
            url: "https://solace-admin.herokuapp.com/api/watson/write",
            success: function(data){
              $('#comment').val('');
              $('#watson-posted').show();
              console.log('Successful post data to backend');

            },
            error: function() {
              console.log('Failed to post data to backend');

            }
         });

      }
    });

  });
});