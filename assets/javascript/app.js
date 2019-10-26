$(document).ready(function() {
  let topics = ['dog', 'wolf', 'cat', 'lion', 'duck']
  var placeholder = $(".placeholder")
  var userInput = $("#user-input")
  var submit = $("#submit")
  var gifLibrary = $(".gif-library")
  
  function renderButtons(query, element) {
    placeholder.empty();
    
    for (let i = 0; i < query.length; i++) {
    // $.each(query, function (index, topic)) // $.each() === for loop [i]
      var btn = $("<button>");
      btn.text(query[i]);
      btn.addClass("topics-button");
      btn.attr("data-name", query[i]);
      element.append(btn);
    }
  }
  renderButtons(topics, placeholder);

  $(submit).on("click", function() {
    event.preventDefault();
    var newUserInput = userInput.val();
    userInput.val(""); // resets value to blank
    topics.push(newUserInput); // 1. target variable 2. what you gonna do to it 3. what you want to do the thing you want to do it to
    renderButtons(topics, placeholder);
  });
  
  $(document).on("click", ".topics-button", function() {
    // api setup
    const querySearch = $(this).attr("data-name");
    const api_url = 'https://api.giphy.com/v1/gifs/search' + '?api_key=' + "9W3IpIZHDN253pTxBoYKMwTUbgvFp3up" + '&q=' + querySearch + '&limit=10&offset=0&rating=&lang=en';
    
    $.ajax({
      url: api_url,
      method: "GET",
      dataType:"JSON"
    }).then(response => {
      console.log(response.data); // ← PATHWAY array
      const data = response.data;
      // empty method has to be outside forloop for multiple gifs to show
      gifLibrary.empty();

      for (let i = 0; i < data.length; i++) { // apply [i]
        const rating = data[i].rating;
        const title = data[i].title;
        const image_url = data[i].images.original_still.url; // ← img url
        
        gifLibrary.append(
          `
          <div class="gif-container">
            <h1>Title: ${title}, <span>${rating}</span></h1>
            <img src="${image_url}" class="gif-image" data-state="still">
          </div>
          `
        );
      }
    });
  });

  // makes gifs still/start on-click
  $(document).on('click', '.gif-image', function () {
    let state = $(this).attr('data-state');
  
    if (state === "still") {
      $(this).attr("data-state", "animate");
      $(this).attr('src', $(this).attr('src').replace('/giphy_s', '/giphy'));
    } else {
      $(this).attr("data-state", "still");
      $(this).attr('src', $(this).attr('src').replace('/giphy', '/giphy_s'));
    }
  });
});
// Bug - line 39-57: Works as in intended, up until no new gif is picked, shows same