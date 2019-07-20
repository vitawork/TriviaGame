$(document).ready(function() {
  var timer = 60;
  var right = 0;
  var wrong = 0;
  var tout = 0;
  var actualqindex = -1;

  var audiofail = new Audio("./assets/sounds/fail.mp3");
  var audiocorrect = new Audio("./assets/sounds/correct.wav");

  var next_timeout;
  var question_timeout;
  var intervalId;

  var questions = [
    {
      question: "Some months have 31 days; how many have 28?",
      answers: ["One", "Twelve", "Four"],
      ansposition: 0,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1c523a.jpg"
    },
    {
      question: "Do they have a 4th of July in England?",
      answers: ["Yes", "No", "Sometimes"],
      ansposition: 1,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1ca2ea.jpg"
    },
    {
      question: "Why can’t a man living in the U.S. be buried in Canada?",
      answers: [
        "You can't be buried outside of your own country",
        "He's not a Canadian citizen",
        "He can't be buried if he's not dead"
      ],
      ansposition: 2,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1cfaa7.jpg"
    },
    {
      question: "How many outs are there in an inning?",
      answers: ["3", "2", "6"],
      ansposition: 2,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1d5407.jpg"
    },
    {
      question:
        "A doctor gives you three pills telling you to take one every half hour. How long would the pills last?",
      answers: ["3 hours", "2 hours", "1 hour"],
      ansposition: 2,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1daaef.jpg"
    },
    {
      question: "How many two cent stamps are there in a dozen?",
      answers: ["None", "6", "12"],
      ansposition: 2,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1e06d6.jpg"
    },
    {
      question: "How many animals of each sex did Moses take on the ark?",
      answers: [
        "Two of each",
        "None, Moses didn't board the ark",
        "Three of each"
      ],
      ansposition: 1,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1e67dd.jpg"
    },
    {
      question:
        "A clerk in the butcher shop is 5’10” tall. What does he weigh?",
      answers: ["There's no way of knowing", "200", "Meat"],
      ansposition: 2,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1ec231.jpg"
    },
    {
      question:
        "Before the Mount Everest was discovered, what was the highest mountain in the world?",
      answers: ["The swiss Alps", "Mount Everest", "Mount Kilamanjaro"],
      ansposition: 0,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d1f1023.jpg"
    },
    {
      question:
        "If there are fifteen crows on the fence and the farmer shoots a third of them, how many are left?",
      answers: ["None", "Four", "Three"],
      ansposition: 0,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d20254f.jpg"
    },
    {
      question: "How many times you can subtract the number 5 from 25?",
      answers: ["Twice", "Once", "Three times"],
      ansposition: 1,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d207d41.jpg"
    },
    {
      question:
        "Is it legal for a man in California to marry his widow’s sister?",
      answers: [
        "Of course he can",
        "No he's dead",
        "It depends on the circumstances of his death"
      ],
      ansposition: 1,
      imageUrl:
        "http://quizpug.com/wp-content/uploads/qc-images/588243d20c640.jpg"
    }
  ];

  function reset() {
    right = 0;
    wrong = 0;
    tout = 0;
    actualqindex = -1;
    next();
  }

  function show_question_answers(index) {
    $("#question").html(questions[index].question);
    $("#answer1").html(questions[index].answers[0]);
    $("#answer2").html(questions[index].answers[1]);
    $("#answer3").html(questions[index].answers[2]);
    $("#questionimg").attr("src", questions[index].imageUrl);
  }

  reset(); ///////reseating to start

  function right_wrong_timeout_answer(rwt) {
    clearTimeout(question_timeout);
    clearInterval(intervalId);

    if (rwt === "Right Answer") {
      right++;
      $("#winrow h4").text(right);
    } else {
      if (rwt === "Wrong Answer") {
        wrong++;
        $("#looserow h4").text(wrong);
      } else {
        tout++;
        $("#timeoutrow h4").text(tout);
      }
    }

    $("#divcentral3").css("display", "none");
    $("#divcentral1").fadeOut(500, function() {
      $("#divcentral2").fadeIn(500, function() {
        $("#rwt")
          .fadeOut()
          .fadeIn()
          .fadeOut()
          .fadeIn();
      });
    });
    $("#rwt").text(rwt);

    $("#answer").text(
      "Answer: " +
        questions[actualqindex].answers[questions[actualqindex].ansposition]
    );
    if (actualqindex === questions.length - 1) {
      $(".next").text("Finish");
    }
    next_timeout = setTimeout(function() {
      next();
    }, 6000);
  }

  function next() {
    if (actualqindex === questions.length - 1) {
      $("#divcentral1").css("display", "none");
      $("#divcentral2").fadeOut(500, function() {
        $("#divcentral3").fadeIn(500);
      });
      $("#winrow h1").text("Correct: " + right);
      $("#looserow h1").text("Wrong: " + wrong);
      $("#timeoutrow h1").text("Time Out: " + tout);
    } else {
      $(".next").text("Next");
      actualqindex++;
      timer = 60;

      $("#divcentral3").css("display", "none");
      $("#divcentral2").fadeOut(500, function() {
        $("#divcentral1").fadeIn(500);

        $("#answer3").hide();
        $("#answer2").hide();
        $("#answer1")
          .hide()
          .show(300, function() {
            $("#answer2").show(300, function() {
              $("#answer3").show(300);
            });
          });
      });

      $("#timerrow h4").text("00:00");
      $("#winrow h4").text(right);
      $("#looserow h4").text(wrong);
      $("#timeoutrow h4").text(tout);

      show_question_answers(actualqindex);

      intervalId = setInterval(count, 1000);

      question_timeout = setTimeout(function() {
        clearInterval(intervalId);
        audiofail.play();
        right_wrong_timeout_answer("Time Out");
      }, 1000 * timer);
    }
  }

  function count() {
    timer--;
    var converted = timeConverter(timer);
    $("#timerrow h4").text(converted);
  }

  function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }

  // answers buttons////////////
  $("#answer1").click(function() {
    if (questions[actualqindex].ansposition === 0) {
      right_wrong_timeout_answer("Right Answer");
      audiocorrect.play();
    } else {
      right_wrong_timeout_answer("Wrong Answer");
      audiofail.play();
    }
  });

  $("#answer2").click(function() {
    if (questions[actualqindex].ansposition === 1) {
      right_wrong_timeout_answer("Right Answer");
      audiocorrect.play();
    } else {
      right_wrong_timeout_answer("Wrong Answer");
      audiofail.play();
    }
  });
  $("#answer3").click(function() {
    if (questions[actualqindex].ansposition === 2) {
      right_wrong_timeout_answer("Right Answer");
      audiocorrect.play();
    } else {
      right_wrong_timeout_answer("Wrong Answer");
      audiofail.play();
    }
  });

  // button next///////////
  $(".next").click(function() {
    next();
    clearTimeout(next_timeout);
  });

  $(".start").click(function() {
    reset();
  });
});
