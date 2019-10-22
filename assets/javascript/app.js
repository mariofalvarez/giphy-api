$(document).ready(function() {
  let topics = ['dog', 'cat', 'rat', 'bat', 'mouse']
  var placeholder = $(".placeholder")
  var userInput = $("#user-input")
  var submit = $("#submit")
  
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

  $(submit).on("click", function() {
    event.preventDefault();
    var userInput2 = userInput.val();
    userInput.val(""); // resets value to blank
    topics.push(userInput2); // 1. target variable 2. what you gonna do to it 3. what you want to do the thing you want to do it to
    renderButtons(topics, placeholder);
  });

  $.ajax({
    url:
    method:
    dataType:
  })
});