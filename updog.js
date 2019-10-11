const readline = require('readline')
const prompts = require('./prompts.json')

const intro = async () => {
  console.log(`
                        
_____     ____          
|  |  |___|   \\ ___ ___ 
|  |  | . |  |  | . | . |
|_____|  _|____/|___|_  |
      |_|           |___|

The training simulator

Instructions:

You will be provided with a potential definition of "Updog".
But the answer will not be updog. Your challenge is to solve
each clue by responding with the word the clue is referencing.

As an example, if the prompt was "I think updog is a word you
would use to describe a positive trend.

You would respond with "upward"

Let's give it a try.


`)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let i = 0

const ask = async prompt => {
  if (i === 0) {
    await intro()
  }

  rl.question(`I think "updog" is ${prompt.clue}.\n\n>> `, (answer) => {
    if (answer.toLowerCase() === prompt.word.toLowerCase()) {
      console.log(`\nAh, that\'s right, that is ${answer}`)
      console.log('')
      i++
    } else if (answer.toLowerCase() === 'hint') {
      console.log('Oh you need a hint. Well here you go.\n\n')
      console.log(prompt.hint)
      console.log('\n\n')
    } else {
      console.log('No that\'s not it. I\'m pretty sure it\'s updog')
      console.log('')
    }

    if (prompts[i]) {
      setTimeout(() => {
        ask(prompts[i])
      }, 2000)
    } else {
      console.log('')
      console.log('Huzzah! You are now an updog master. Go forth and conquer!!')
      rl.close()
    }
  })
}

// Shuffle prompts with Fisher-Yates shuffle https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;
  
  // While there remain elements to shuffle…
  while (m) {
  
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  
    return array;
}
  
var shuffledPrompts = shuffle(prompts)

// start the game
ask(shuffledPrompts[i])
