use std::env;
use std::error::Error;
use std::fs;
use std::process::Command;

// store our current day and puzzle input together
pub struct Config {
    pub current_day: String,
    pub puzzle_input: bool,
    pub year: String,
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

        // not every day needs a separate input file, so make note of if one exists or not
        let puzzle_input = match args.next() {
            Some(_arg) => true,
            None => false,
        };

        // if a year is provided, create it using that year's folder/structure - default to current year
        let year = match args.next() {
            Some(arg) => arg,
            None => "2020".to_string(),
        };

        // return our new config struct
        Ok(Config {
            current_day,
            puzzle_input,
            year,
        })
    }
}

// the main run function
pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    // create files
    create_files(config);
    // return ok to end function
    Ok(())
}

// setup files
pub fn create_files(config: Config) -> () {
    // make sure the day string is 2 digits - if not, add a 0 in front of what's provided (only time it won't be 2 digits is if it's 0-9)
    let mut day: String = config.current_day;
    if day.len() != 2 {
        day = format!("{}{}", "0".to_string(), day);
    }

    // make the input file, if input is true
    let folder_path: String = format!(
        "{}{}{}",
        "./".to_string(),
        config.year,
        " Solutions/".to_string()
    );

    let input_path: String = format!(
        "{}{}{}{}",
        folder_path,
        "inputs/day".to_string(),
        day,
        "input.txt".to_string()
    );
    if config.puzzle_input {
        fs::File::create(&input_path).expect("Could not create input file.");
    }

    // make a new file for the day
    let file_path: String = format!(
        "{}{}{}{}",
        folder_path,
        "day".to_string(),
        day,
        ".js".to_string()
    );

    // write the boilerplate data to our file - import needed files and packages, and write the call to read in the input file if it exists
    let mut data_to_write: String = "import * as c from '../chalk_styles.js';\r\nimport * as h from '../helpers.js';\r\n\r\n".to_string();
    if config.puzzle_input {
        let input_data = format!(
            "{}{}{}",
            "import { readFileSync } from 'fs';\r\nconst data = readFileSync('".to_string(),
            input_path,
            "').toString();".to_string()
        );
        data_to_write = data_to_write + &input_data;
    }
    fs::write(&file_path, data_to_write).expect("Could not create day file");

    // test line to check what the editor path is, if needed
    // println!("env path: {:?}", env::var_os("EDITOR"));

    // grab the editor path then open the file in vscode and get started!
    let editor = env::var_os("EDITOR").unwrap();
    Command::new(editor)
        .arg(&file_path)
        .status()
        .expect("Sorry, could not open file.");
    println!("Files ready! Go solve that puzzle!")
}
