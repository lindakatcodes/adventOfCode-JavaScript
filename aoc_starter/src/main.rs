use std::env;
use std::process;

// our functionality file
use aoc_starter::Config;

fn main() {
    let config = Config::new(env::args()).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {}", err);
        process::exit(1);
    });

    if let Err(e) = aoc_starter::run(config) {
        eprintln!("Application error: {}", e);
        process::exit(1);
    }
}
