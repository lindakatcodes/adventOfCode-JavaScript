//shoutout to u/tlareg - I could NOT figure today's out on my own, and your code (mostly) made sense to me, so I ended up utilizing it. Definitely need to look into constructors in the future.....I had the idea of declaring objects and making new ones, but was totally lost on implementing it. Thanks for sharing your code!
//Comments are my own, to show what I figured out and what I might understand incorrectly

//I don't fully understand class, but this sets an empty array for bots and outputs, which will hold them when they're declared
class State {
  constructor() {
    this.bots = []
    this.outputs = []
  }

//searches for a bot|output by it's id number    
  findById(target, targetId) {
    if (target === 'bot') {
      return this.findBotById(targetId)
    }
    if (target === 'output') {
      return this.findOutputById(targetId)
    }
    return null
  }

//more specific search for bot - if it exists already return it, otherwise create a new one and return that    
  findBotById(id) {
    return this.bots.find(bot => bot.id === id) || this.addBot(id)
  }
//creates the new bot
  addBot(id) {
    const newBot = new Bot(id, this)
    this.bots = [...this.bots, newBot]
    return newBot
  }

//more specific output search - same as bot but for outputs    
  findOutputById(id) {
    return this.outputs.find(output => output.id === id) || this.addOutput(id)
  }

//creates new outputs    
  addOutput(id) {
    const newOutput = new Output(id)
    this.outputs = [...this.outputs, newOutput]
    return newOutput
  }

//would be used to display all the bots|outputs you currently have stored, showing the number and it's values    
  display() {
    this.bots.forEach(b => {
      console.log(`Bot(${b.id}): ${b.vals}`)
    })
    this.outputs.forEach(o => {
      console.log(`Output(${o.id}): ${o.vals}`)
    })
  }
}

//specific creator for output objects
class Output {
  constructor(id) {
    this.id = id
    this.vals = []
  }

//adds new values to that output's vals    
  pushVal(val) {
    this.vals = [...this.vals, val]
  }
}

//specific creator for bot objects
class Bot {
  constructor(id, state) {
    this.id = id
    this.state = state
    this.vals = []
    this.commands = []
  }

//adds a val to that bot's vals array - if it has more than 1 val (so it's full) and it knows what to do, it executes it's command    
  pushVal(val) {
    this.vals = [...this.vals, val]
    if (this.vals.length > 1 && this.commands.length) {
      this.executeCommand()
    }
  }

//when input gives the command for a specific bot, adds that command to it's object - again if it has 2 vals and now the command it runs it    
  pushCommand(command) {
    this.commands = [...this.commands, command]
    if (this.vals.length > 1 && this.commands.length) {
      this.executeCommand()
    }
  }

//the function for how to set a bot|output's low and high val and how/where to pass them off    
  executeCommand() {
    let lowVal;
    let highVal;

//sort the vals      
    if (this.vals[0] < this.vals[1]) {
      lowVal = this.vals[0]
      highVal = this.vals[1]
    } else {
      lowVal = this.vals[1]
      highVal = this.vals[0]
    }
    this.vals = []

//part 1 answer - searching for the bot who deals with these two values      
    if (lowVal === 17 && highVal === 61) {
      console.log(`Part 1 answer = Bot(${this.id})`)
    }

//not real sure about these 3 lines....      
    const [
      lowValTarget, lowValTargetId, highValTarget, highValTargetId
    ] = this.commands.pop()

//finds and submits the vals where they're meant to go per previous description      
    this.state.findById(lowValTarget, lowValTargetId).pushVal(lowVal)
    this.state.findById(highValTarget, highValTargetId).pushVal(highVal)
  }
}

//read in the file and parse it
const fs = require('fs')
const inputStr = fs.readFileSync('\day10input.txt').toString()

parseInput(inputStr)

//declares a new state for each line in input
function parseInput(str) {
  const state = new State()

  str.split('\r\n').forEach(line => parseInputLine(line, state))

//part 2 answer - multiply the values of one chip in 0/1/2 outputs (the wording of this question was confusing to me, never would've got this)
  const part2answer = [0, 1, 2].reduce((acc, id) => {
    return acc * state.findOutputById(id).vals[0]
  }, 1)
  console.log(`Part 2 answer = ${part2answer}`)
}

function parseInputLine(line, state) {
    //first set match to see if it's a value line
  let match = line.match(/^value\s(\d+)\s.+bot\s(\d+)$/)

//if so, set the ints and send them to the right bot    
  if (match) {
    const val = parseInt(match[1], 10)
    const botId = parseInt(match[2], 10)
    const bot = state.findBotById(botId)
    bot.pushVal(val)
    return;
  } 

//then check line to see if it makes a command    
  match = line.match(
    /^bot\s(\d+)\s.+low\sto\s(output|bot)\s(\d+).+to\s(output|bot)\s(\d+)$/
  )

//if so, set all the ints/vals and assign them where they're meant to go    
  if (match) {
    const botId = parseInt(match[1], 10)
    const lowValTarget = match[2]
    const lowValTargetId = parseInt(match[3], 10)
    const highValTarget = match[4]
    const highValTargetId = parseInt(match[5], 10)
    const bot = state.findBotById(botId)
    bot.pushCommand([lowValTarget, lowValTargetId, highValTarget, highValTargetId])
  }
}