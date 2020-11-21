use std::env;
use std::error::Error;
use std::fs;
use std::process::Command;

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

        // not every day needs a separate input file, so make note of it one exists or not
        let puzzle_input = match args.next() {
            Some(arg) => arg,
            None => return Err("Do you need a puzzle input file? Please say true or false"),
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

    // create files
    create_files(config);
    // return ok to end function
    Ok(())
}

// setup files
pub fn create_files(config: Config) -> () {
    println!("creating files!");
    // make sure the day string is 2 digits - if not, add a 0 in front of what's provided (only time it won't be 2 digits is if it's 0-9)
    let mut day: String = config.current_day;
    if day.len() != 2 {
        day = format!("{}{}", "0".to_string(), day);
        println!("{}", day);
    }

    // make the input file, if input is true

    let input_path: String = format!(
        "{}{}{}",
        "./2020 Solutions/inputs/day".to_string(),
        day,
        "input.txt".to_string()
    );
    if config.puzzle_input == "true" {
        fs::File::create(&input_path).expect("Could not create input file.");
    }
    // make a new file named day##.js
    let file_path: String = format!(
        "{}{}{}",
        "./2020 Solutions/day".to_string(),
        day,
        ".js".to_string()
    );
    // write the first few lines needed - require fs, and call to read and convert the input file to string (if input file exists)
    let mut data_to_write: String = "".to_string();
    if config.puzzle_input == "true" {
        data_to_write = format!(
            "{}{}{}",
            "const fs = require('fs');
            
const data = fs.readFileSync('../inputs/day"
                .to_string(),
            day,
            "input.txt').toString();
            
"
        );
    }
    fs::write(&file_path, data_to_write).expect("Could not create day file");
    // if possible, open new file in editor
    let full_path: String = format!(
        "{}{}{}",
        "D:\\CodeFiles\\adventOfCode-JavaScript\\2020 Solutions\\day".to_string(),
        day,
        ".js".to_string()
    );
    edit::edit_file(&full_path).expect("Could not open file in editor");
    // Command::new("$EDITOR")
    //     .arg(&full_path)
    //     .status()
    //     .expect("Sorry, could not open file.");
}

// C:\\Users\\Linda\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Visual Studio Code
