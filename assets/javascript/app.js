$(document).ready(function() {
  var timer = 0;
  var right = 0;
  var wrong = 0;
  var tout = 0;
  var actualqindex = 0;

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
    $("#divcentral1").css("display", "block");
    $("#divcentral2").css("display", "none");
    $("#divcentral3").css("display", "none");

    $("#timerrow h4").text("00:00");
    $("#winrow h4").text("0");
    $("#looserow h4").text("0");
    $("#timeoutrow h4").text("0");

    timer = 0;
    right = 0;
    wrong = 0;
    tout = 0;
    actualqindex = 0;

    show_question_answers(actualqindex);
  }

  function show_question_answers(index) {
    $("#question").html(questions[index].question);
    $("#answer1").html(questions[index].answers[0]);
    $("#answer2").html(questions[index].answers[1]);
    $("#answer3").html(questions[index].answers[2]);
  }

  reset(); ///////reseating to start

  function right_wrong_timeout_answer(rwt) {
    ////////////////////////////////////////////////////////////////////
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

    if (actualqindex === questions.length - 1) {
      $("#divcentral1").css("display", "none");
      $("#divcentral2").css("display", "none");
      $("#divcentral3").css("display", "block");
    } else {
      $("#divcentral1").css("display", "none");
      $("#divcentral2").css("display", "block");
      $("#divcentral3").css("display", "none");
      $("#rwt").text(rwt);
      $("#answer").text(
        questions[actualqindex].answers[questions[actualqindex].ansposition]
      );
      //////parar y actualizar timer
    }
  }

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

  $(".next").click(function() {
    actualqindex++;
    timer = 0;
    $("#divcentral1").css("display", "block");
    $("#divcentral2").css("display", "none");
    $("#divcentral3").css("display", "none");

    // $("#timerrow h4").text("00:00");   arreglar timer  ////////////
    $("#winrow h4").text(right);
    $("#looserow h4").text(wrong);
    $("#timeoutrow h4").text(tout);

    show_question_answers(actualqindex);
  });

  $(".start").click(function() {
    reset();
  });
});
