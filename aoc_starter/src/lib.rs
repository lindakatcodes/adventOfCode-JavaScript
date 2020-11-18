use std::env;
use std::error::Error;
// use std::fs;

// store our current day and puzzle input together
pub struct Config {
    pub current_day: String,
    pub puzzle_input: String,
}

// make a new config struct with any inputs
impl Config {
    pub fn new(mut args: env::Args) -> Result<Config, &'static str> {
        // can skip the first arg, since it's the file name and we don't need it for anything
        args.next();

        // we do need the current day, so return an error if it wasn't provided
        let current_day = match args.next() {
            Some(arg) => arg,
            None => return Err("Please provide the day you're working on."),
        };

        // not every day needs a separate input file, so save it if it's provided but otherwise that's ok
        let puzzle_input = match args.next() {
            Some(arg) => arg,
            None => "".to_string(),
        };

        // return our new config struct
        Ok(Config {
            current_day,
            puzzle_input,
        })
    }
}

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    println!(
        "Config received: {}, {}",
        config.current_day, config.puzzle_input
    );
    Ok(())
}

// setup puzzle input file
// if it's not an empty string, confirm it's a url
// if so, request the path and grab the data
// make a new file in inputs folder named day##input.txt and write the data to it
// make sure this only runs once!!

// setup main day file
// make sure the day string is 2 digits - if not, add a 0 in front of what's provided (only time it won't be 2 digits is if it's 0-9)
// make a new file named day##.js
// write the first few lines needed - require fs, and call to read and convert the input file to string (if input file exists)
// if possible, open new file in editor
