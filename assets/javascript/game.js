var cartoons = [
  'The Jetsons',
  'Thundercats',
  'Captain America',
  'Aquaman',
  'South Park',
  'Flintstones',
  'Power Rangers',
  'Iron Man',
  'X-Men',
  'Gardians of the Galaxy'
];

function displaycartoonInfo() {
  $('#cartoonsView').empty();

  var cartoon = $(this).attr('data-name');
  var queryURL =
    'http://api.giphy.com/v1/gifs/search?q=' +
    cartoon +
    '&api_key=dc6zaTOxFJmzC&limit=10';

  $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      if (results[i].rating == 'r' || results[i].rating == 'pg-13') {
      } else {
        console.log(response);
        var rating = results[i].rating;
        var p = $('<p>').text('Rating: ' + rating);
        var cartoonImage = $('<img>');
        cartoonImage.attr('src', results[i].images.fixed_height_still.url);
        cartoonImage.attr(
          'data-still',
          results[i].images.fixed_height_still.url
        );
        cartoonImage.attr('data-animate', results[i].images.fixed_height.url);
        cartoonImage.attr('data-state', 'still');
        cartoonImage.addClass('cartoonImage');

        $('#cartoonsView').append(p);
        $('#cartoonsView').append(cartoonImage);
      }
    }

    $('.cartoonImage').on('click', function() {
      var state = $(this).attr('data-state');
      console.log(state);
      if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
      }
    });
  });
}

function renderButtons() {
  $('#buttonsView').empty();

  for (var i = 0; i < cartoons.length; i++) {
    var a = $('<button>');
    a.addClass('cartoon');
    a.addClass('btn btn-success');
    a.addClass('btn btn-primary btn-lg');
    a.attr('data-name', cartoons[i]);
    a.text(cartoons[i]);
    $('#buttonsView').append(a);
  }
}

$('#addcartoon').on('click', function() {
  var cartoon = $('#cartoon-input')
    .val()
    .trim();
  cartoons.push(cartoon);
  renderButtons();
  return false;
});

$(document).on('click', '.cartoon', displaycartoonInfo);

renderButtons();
