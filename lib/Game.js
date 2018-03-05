var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./Word");
var words = require("./words");


function Game() {

    var self = this;

    this.play = function() {
        this.guessesLeft = 10;
        this.nextWord();
    };


    this.nextWord = function() {
        var randWord = words[Math.floor(Math.random() * words.length)];
        this.currentWord = new Word(randWord);
        console.log('\n' + this.currentWord + '\n');
        this.makeGuess();
    };


    this.makeGuess = function() {
        this.askForLetter().then(function() {

            if (self.guessesLeft < 1) {
                console.log(
                    "No guesses left! Word was: \"" + self.currentWord.getSolution() + "\"\n"
                );
                self.askToPlayAgain();


            } else if (self.currentWord.guessedCorrectly()) {
                console.log("You got it right! Next word!");
                self.guessesLeft = 10;
                self.nextWord();


            } else {
                self.makeGuess();
            }
        });
    };


    module.exports = Game;