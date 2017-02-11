$(document).ready(function(){
  let email  = $('.email').val();
  let password = $('.password').val();

  chrome.storage.sync.get('id_token', function(result){
    if (result.id_token === undefined || result.id_token === null) {
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
        type: 'POST',
        data: $(this).serialize(),
        url: 'https://solace-admin.herokuapp.com/api/tokens/sessions/create',
        success: function(data){

          $('.text-form').show();
          $('#login-container').hide();

          console.log('successful sign in here is data', data.user)
          chrome.storage.sync.set({'id_token': data.id_token, 'user': data.user}, function(){
            console.log('id_token saved in storage');
          });
        },
        error: function() {
          $('#invalid').show();
        }
      });
      return false;
  });

  $('#logout-button').click(function(){
      chrome.storage.sync.remove(['id_token', 'user'], function(){
        console.log('Successfully logged out')
        $('#comment').val('');
        $('.text-form').hide();
        $('#login-container').show();
        $('#invalid').hide();
        $('form').trigger('reset');
      });
  });

  $('#comment').keyup(function () {
    var min = 1000;
    var count = $(this).val().length;
    $('#character-count').text(count + '/1000');
    if (count >= min) {
      $('#submit-button').prop('disabled', false);
    }
  });

  // Including keydown for long presses, such as holding down the delete button
  $('#comment').keydown(function () {
    var min = 1000;
    var count = $(this).val().length;
    $('#character-count').text(count + '/1000');
    if (count >= min) {
      $('#submit-button').prop('disabled', false);
    }
  });

  $('#submit-button').click(function(){
    var comment = $('#comment').val();
    $('#watson-posted').hide();
    chrome.storage.sync.get('user', function(result){
      if (result.user) {
         $.ajax({
            type: 'POST',
            data: {text: comment, userID: result.user.id},
            url: 'https://solace-admin.herokuapp.com/api/watson/write',
            success: function(data){
              console.log(data)
              $('#comment').val('');
              $('#watson-posted').show();
              console.log('Successfully posted data to backend');
            },
            error: function() {
              console.log('Failed to post data to backend');
            }
         });
      }
    });
  });
});
