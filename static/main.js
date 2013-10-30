// global configs
var FRONT_END = 1;
var MIDDLE_WARE = 2;
var BACK_END = 3;
var REVIEWER_LIMIT = 3;

// coder object
var coders = [
  {'name': 'Craig',  'group': FRONT_END,   reviewing: [], reviewers: []},
  {'name': 'Ross',   'group': FRONT_END,   reviewing: [], reviewers: []},
  {'name': 'Diana',  'group': FRONT_END,   reviewing: [], reviewers: []},
  {'name': 'Burton', 'group': FRONT_END,   reviewing: [], reviewers: []},
  {'name': 'Dylan',  'group': FRONT_END,   reviewing: [], reviewers: []},
  {'name': 'Walker', 'group': FRONT_END,   reviewing: [], reviewers: []},
  {'name': 'Jonah',  'group': MIDDLE_WARE, reviewing: [], reviewers: []},
  {'name': 'Darryl', 'group': MIDDLE_WARE, reviewing: [], reviewers: []},
  {'name': 'Megan',  'group': MIDDLE_WARE, reviewing: [], reviewers: []},
  {'name': 'Aspen',  'group': MIDDLE_WARE, reviewing: [], reviewers: []},
  {'name': 'Kyle',   'group': MIDDLE_WARE, reviewing: [], reviewers: []},
  {'name': 'Brian',  'group': MIDDLE_WARE, reviewing: [], reviewers: []},
  {'name': 'Paul',   'group': BACK_END,    reviewing: [], reviewers: []},
  {'name': 'Janette','group': BACK_END,    reviewing: [], reviewers: []},
  {'name': 'Lewis',  'group': BACK_END,    reviewing: [], reviewers: []},
  {'name': 'Greg',   'group': BACK_END,    reviewing: [], reviewers: []},
  {'name': 'Hannah', 'group': BACK_END,    reviewing: [], reviewers: []}
];

// random assignment
function assignReviewer(coder, differentiator) {
  var randomNumber = Math.floor((Math.random() * coders.length - 1) + 1);
  var potentialReviewer = coders[randomNumber];
  var groupDifference = (potentialReviewer.group - coder.group);
  if (potentialReviewer.reviewing != null &&
    potentialReviewer.reviewing.length < REVIEWER_LIMIT &&
    potentialReviewer !== coder &&
    (groupDifference >= -1 * differentiator && groupDifference <= 1 * differentiator)
    && !_.contains(potentialReviewer.reviewing, coder.name)) {
    return potentialReviewer;
  } else {
    return assignReviewer(coder, differentiator);
  }
}

// define reviewers
_.each(coders, function (coder) {
  var reviewer1 = assignReviewer(coder, 0);
  coder.reviewers.push(reviewer1.name);
  reviewer1.reviewing.push(coder.name);
  var reviewer2 = assignReviewer(coder, 1);
  coder.reviewers.push(reviewer2.name);
  reviewer2.reviewing.push(coder.name);
});

// organize results, event handlers
$(function() {
  $("#big-ass-reload").hide()
  _.each(coders, function (coder) {
    $("#big-ass-btn").click(function() {
      $("#results").append("<h4>"+coder.name+"</h4><div>Reviewing: "+coder.reviewing.join(', ')+"</div><div>Reviewers: "+coder.reviewers.join(', ')+"</div><br>");
      $("#big-ass-btn").fadeOut(900)
      $("#big-ass-reload").fadeIn(1000)
    });  
  });
  $('#big-ass-reload').click(function() {
    location.reload();
  });
});