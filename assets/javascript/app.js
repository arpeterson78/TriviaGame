// On click function to start the game
$("#start").on("click", function() {
    $("#start").remove();
    game.loadQuestion();
})
// On click function to determine what answer they clicked
$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
})
// On click function for the reset button at the end of the game
$(document).on("click", "#reset", function() {
    game.reset();
})
// An array of all of the questions, answers, and gif's
var questions = [
    {
        question: "That's what...",
        answers: ["he said", "we said", "she said", "they said"],
        correctAnswer: "she said",
        gif: "assets/gifs/question1.gif",
    }, {
        question: "Bears, beets...",
        answers: ["Battleship", "Battlestar Galactica", "Battleship Galactic", "Battlestar Galactic"],
        correctAnswer: "Battlestar Galactica",
        gif: "assets/gifs/question2.gif",
    }, {
        question: "Dwight kills one of Angela's cats. That cats name is:",
        answers: ["Sprinkles", "Cupcake", "Sweet Tart", "Sweet Pie"],
        correctAnswer: "Sprinkles",
        gif: "assets/gifs/question3.gif",
    }, {
        question: "What was Michael and Jan's safe word?",
        answers: ["Avocado", "Sweet Potato", "Foliage", "Turtles"],
        correctAnswer: "Foliage",
        gif: "assets/gifs/question4.gif",
    }, {
        question: "By hitting Meredith with his car, Michael saved her from what deadly disease?",
        answers: ["Skin Cancer", "Leukemia", "HIV/AIDS", "Rabies"],
        correctAnswer: "Rabies",
        gif: "assets/gifs/question5.gif",
    }, {
        question: "When in a competition with his office to see who can sprint the fastest, Michael runs in the middle of the street and measures his speed with a street speedometer. How fast did he claim to run?",
        answers: ["24 MPH", "16 MPH", "31 MPH", "20 MPH"],
        correctAnswer: "31 MPH",
        gif: "assets/gifs/question6.gif",
    }, {
        question: "What is the name of a place you can go to dance and get espresso?",
        answers: ["Disco Cafe", "Dance Cafe", "Club Espresso", "Cafe Disco"],
        correctAnswer: "Cafe Disco",
        gif: "assets/gifs/question7.gif",
    }, {
        question: "Does Stanley have a moustache?",
        answers: ["Yes", "No"],
        correctAnswer: "Yes",
        gif: "assets/gifs/question8.gif",
    }, {
        question: "Who does Michael Scott hate the most?",
        answers: ["Adolf Hitler", "Joseph Stalin", "Osama Bin Laden", "Toby"],
        correctAnswer: "Toby",
        gif: "assets/gifs/question9.gif",
    }, {
        question: "When Andy gets back from anger management, he asks people to call him by what name?",
        answers: ["Stew", "Lou", "Drew", "James"],
        correctAnswer: "Drew",
        gif: "assets/gifs/question10.gif",
    }
];
// Here we made the game an object with attributes and a series of methods that will call one another to run the game
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 20,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
// This method will create the countdown for the timer
    countdown: function() {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter <= 0) {
            console.log("Time Up");
            game.timeUp();
        }
    },
// This method will load the question and answer choices
    loadQuestion: function() {
        timer = setInterval(game.countdown,1000);
        $("#subwrapper").html("<h2 id='counter'>20</h2>")
        $("#subwrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $("#subwrapper").append("<button class='answer-button' id='button-"+ i + "' data-name='"+questions[game.currentQuestion].answers[i]+"'>" + questions[game.currentQuestion].answers[i]+ "</button><br><br>");
        }

    },
// This method will reset the time and trigger us to move up one index in our questions array to list the next question
    nextQuestion: function() {
        game.counter = 20;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
// This method will run if they do not answer the question in the alotted time. 
    timeUp: function() {
        clearInterval(timer);
        game.unanswered++;
        $("#subwrapper").html("<h2>Out of time!</h2>");
        $("#subwrapper").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion === questions.length -1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },
// This method will display their overall score and give them the option to start over
    results: function () {
        clearInterval(timer);
        $("#subwrapper").html("<h2>All Done!</h2>");
        $("#subwrapper").append("<h3>Correct: " + game.correct + "</h3>");
        $("#subwrapper").append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $("#subwrapper").append("<button id='reset'>Star Over</button>");
    },
// This method will identify what answer they clicked and dictate if it is correct or not
    clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).data('name') === questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    
    },
// This method display if they answer the question correctly
    answeredCorrectly: function() {
        console.log("You got it!");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2>You got it right!</h2>");
        $("#subwrapper").append("<img src='" + questions[game.currentQuestion].gif + "'/>");
        if (game.currentQuestion === questions.length -1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
// This method display if they answer the question incorrectly
    answeredIncorrectly: function() {
        console.log("wrong!");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2>You got it Wrong!</h2>");
        $("#subwrapper").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        $("#subwrapper").append("<img src='" + questions[game.currentQuestion].gif + "'/>");
        if (game.currentQuestion === questions.length -1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
// This will allow the user to restart the game, clearing all attributes.
    reset: function() {
        game.currentQuestion = 0;
        game.counter = 20;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }

}

