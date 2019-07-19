$(document).ready(function() {
  var timer = 60;
  var right = 0;
  var wrong = 0;
  var tout = 0;
  var actualqindex = -1;

  var next_timeout;
  var question_timeout;
  var intervalId;

  var questions = [
    {
      question: "1preguntasferereerv",
      answers: ["1aaaaaaaa", "2aaaaaaaa", "3aaaaaaaaaaa"],
      ansposition: 0
    },
    {
      question: "2preguntasferereerv",
      answers: ["1bbbbbbb", "2bbbbbbb", "3bbbbbbb"],
      ansposition: 1
    },
    {
      question: "3preguntasferereerv",
      answers: ["1ccccccccc", "2ccccccccc", "3ccccccccc"],
      ansposition: 2
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

    $("#divcentral1").css("display", "none");
    $("#divcentral2").css("display", "block");
    $("#divcentral3").css("display", "none");
    $("#rwt").text(rwt);
    $("#answer").text(
      questions[actualqindex].answers[questions[actualqindex].ansposition]
    );
    if (actualqindex === questions.length - 1) {
      $(".next").text("Finish");
    }
    next_timeout = setTimeout(function() {
      if (actualqindex === questions.length - 1) {
        $("#divcentral1").css("display", "none");
        $("#divcentral2").css("display", "none");
        $("#divcentral3").css("display", "block");
      } else {
        next();
      }
    }, 7000);
  }

  function next() {
    if (actualqindex === questions.length - 1) {
      $("#divcentral1").css("display", "none");
      $("#divcentral2").css("display", "none");
      $("#divcentral3").css("display", "block");
    } else {
      $(".next").text("Next");
      actualqindex++;
      timer = 60;
      $("#divcentral1").css("display", "block");
      $("#divcentral2").css("display", "none");
      $("#divcentral3").css("display", "none");

      $("#timerrow h4").text("00:00");
      $("#winrow h4").text(right);
      $("#looserow h4").text(wrong);
      $("#timeoutrow h4").text(tout);

      show_question_answers(actualqindex);

      intervalId = setInterval(count, 1000);

      question_timeout = setTimeout(function() {
        clearInterval(intervalId);
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
    } else {
      right_wrong_timeout_answer("Wrong Answer");
    }
  });

  $("#answer2").click(function() {
    if (questions[actualqindex].ansposition === 1) {
      right_wrong_timeout_answer("Right Answer");
    } else {
      right_wrong_timeout_answer("Wrong Answer");
    }
  });
  $("#answer3").click(function() {
    if (questions[actualqindex].ansposition === 2) {
      right_wrong_timeout_answer("Right Answer");
    } else {
      right_wrong_timeout_answer("Wrong Answer");
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
