


!function(x) {
  "use strict";
  $(function(y) {
      var  val, nytimes, nytUrl, articleCaption = $(".loading"), articleList = $(".the-news");
      $("#choosing").on("change", function(article) {
          article.preventDefault()
          var nytData = $('select option:selected').val();
          nytUrl = "http://api.nytimes.com/svc/topstories/v2/" + nytData + ".json?api-key=5900a135d21e4067a52a4cacdafee7ac",
          articleList .empty(), val = "", nytimes = "", $(".logo img").css({
              height: "50%",
              width: "50%"
          }), $(".the-header").css({
              "align-items": "flex-start",
              height: "auto",
              "max-width": "600px"
          }),  articleCaption.css("display", "block");


          $.ajax({

              url: nytUrl,
              method: "GET",
              dataType: "json"
          }).done(function(val) {
              var nytUrl, articleCaption, article, result = val.results;
              0 !== result.length ? (result = result.filter(function(x) {
                  return x.multimedia.length;
              }).splice(0, 12), nytimes += "<ul>",
              $.each(result, function(key,val) {
                  article = val.multimedia[4].url,
                  articleCaption = val["abstract"],
                  nytUrl = val.url,
                  nytimes += '<li class="article-item">',
                  nytimes += '<a  class="inner" href="' + nytUrl + '" target="_blank">',
                  nytimes += '<div class="inner-item-wrapper">',
                  nytimes += '<div class="article" style="background-image:url('+ article +')">',
                  nytimes += '<div class="story-meta">',
                  nytimes += "<p>" + (articleCaption || "This story has no description.") + "</p>",
                  nytimes += "</div>",
                  nytimes += "</div>",
                  nytimes += "</a>",
                  nytimes += "</li>";
                  }), nytimes += "</ul>") :
              nytimes += '<p class="feedback">Sorry, nothing found! Please try again.</p>',
              articleList.hide().fadeIn("slow").append(nytimes);
          }).fail(function(x) {
              articleList.append('<p class="feedback">Sorry! there was a problem , please try again.</p>');
          }).always(function() {
              articleCaption.hide();
          });
      });
  });
}(jQuery);



