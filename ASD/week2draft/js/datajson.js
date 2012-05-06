/*
Your task is to populate the page with the data the user requests using Ajax. Your code should do the following:

- Use Ajax to load the data in /data/data.json.
- Use the data to create an option element for each produce, and add the option to the select element.
- Bind a change event to the select element so that, when it is changed, you request the data for the selected produce. Data for each of the people listed in the people.json file is located at exercises/data/people/{id}.json.
- Use the data for the produce to place the produce's image in the #info element.
  - Clicking on the image should take you to the user's Twitter page.
  - Hovering over the image should make the following information about the produce (from the JSON data) slide down below the 
  image:
    - name
    - ripe date
- The first time data for a produce is viewed, use the data about the produce to add the text "Latest tweet from {username}" and make it a link to their latest tweet (from the JSON data) to the #seen element.
- Ensure that you only fetch data about a produce once; that is, store data once you fetch it so you don't have to fetch it repeatedly.
*/

$(document).ready(function() {

var $select = $('#produce select'),
    $seen = $('#seen'),
    $info = $('#info'),
    produceDataCache = {};

$('<option/>', { html : 'Select Produce' }).appendTo($select);

$.ajax('data/data.json', {
  dataType : 'json',
  success : function(data) {
    $.each(data.produce, function(i, p) {
      $('<option/>', {
        value 	: p.id,
        value 	: p.type,
        html 	: p.name,
        date 	: p.ripedate,
        value 	: p.rating,
        html 	: p.benefit,
        html 	: p.tags,
        html 	: p.graphic,
        html 	: p.comments
      }).appendTo($select);
    });

    $select.bind('change', function(e) {
      var produceId = $(this).val();
      if (!produceId) { return; }
      getProduceData(produceId, showProduce);
    });

    $info.bind('mouseenter', function() {
      var $this = $(this);
      if ($this.children('div').length) { return; }

      var produce = $(this).data('produce'),
          detailTemplate = '<div><p>{{name}}</p><p>{{ripedate}}</p></div>';

      if (!produce) { return; }

      var html = detailTemplate
                  .replace('{{name}}', produce.name)
                  .replace('{{ripedate}}', produce.ripedate || '');

      $(html).hide().appendTo(this).slideDown();
    });
  }
});

function showProduce(produce) {
  var avatarTemplate = '<a href="http://images.google.com/{{name}}"><img src="{{image}}" alt="{{name}}" /></a>',
      html = avatarTemplate
                .replace('{{image}}', produce.image)
                .replace('{{name}}', produce.name);

  $info.html(html).data('produce', produce);
}

function getProduceData(produceId, callback) {
  var dfd = $.when(produceDataCache[produceId] || getRemoteProduceData(produceId));

  dfd.then(callback);

  // if there's nothing in the produceDataCache
  // for the produce, then this is the first time
  // we've fetched data for this produce
  if (!produceDataCache[produceId]) {
    dfd.then(function(produce) {
      produceDataCache[produceId] = produce;
      markSeen(produce);
    });
  }
}

function markSeen(produce) {
  var seenTemplate = '<li><a href="{{tweet}}">Latest tweet from {{twitter}}</a></li>',
      html = seenTemplate
              .replace('{{tweet}}', produce.tweet)
              .replace(/{{twitter}}/g, produce.twitter);

  $seen.append(html);
}

function getRemoteProduceData(produceId) {
  return $.ajax('data/produce/' + produceId + '.json', {
    dataType : 'json'
  });
}

});

