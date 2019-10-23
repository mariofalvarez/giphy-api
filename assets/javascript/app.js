$(document).ready(function() {
  let topics = ['dog', 'cat', 'rat', 'bat', 'mouse']
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
  
  $(document).on("click", ".topics-button", function(event) {
    // api setup
    const querySearch = $(this).attr("data-name");
    const api_url = 'https://api.giphy.com/v1/gifs/search' + '?api_key=' + api_key + '&q=' + querySearch + '&limit=0&offset=0&rating=&lang=en';

    $.ajax({
      url: api_url,
      method: "GET",
      dataType:"JSON"
    }).then(response => {
      // console.log(response.data); // ← PATHWAY array
      const data = response.data;
      for (let i = 0; i < data.length; i++) { // apply [i]
        const rating = data[i].rating;
        const title = data[i].title;
        const image_url = data[i].images.fixed_height.url; // ← img url
        
        gifLibrary.empty();
        
        gifLibrary.append(
          `
          <h1>Title: ${title}</h1>
          <h2> Rating: ${rating}</h2>
          <img src="${image_url}" alt="BOOTY">
          `  
        );
      }
    });
  });
});
// Bug - line 39-57: Works as in intended, up until no new gif is picked, shows same


// EXAMPLE
/* 
  function renderButtons(query, element) {
    placeholder.empty();
    $.each(query, function (index, topic) { // forloop
      var btn = $("<button>");
      btn.text(query[index]);
      btn.addClass("topics-button")
      btn.attr("data-name", query[index]);
      element.append(btn);
    });
  };
  renderButtons(topics, placeholder);

 */

       // create img elements
      // var image = $('<img>');
      // image.attr("src", image_url);

      // gifLibrary.append(image); // placeholder