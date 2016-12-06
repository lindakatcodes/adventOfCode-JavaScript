//shoutout to u/1wheel for code inspiration - especially the ability to use crypto!
//use crypto to perform the hash requirement
var crypto = require('crypto');

//set puzzle input, starting integer, and array to store the password
var input = 'uqwqemis'
var i = 0
//for part 1, password is empty; for part 2, password has 8 blank spaces to be filled
var password = ['', '', '', '', '', '', '', '']

//while the password has blank spaces, run the hash program and find the numbers
while (password.join('').length < 8) {
    var next = crypto.createHash('md5').update(input + i).digest('hex')
    if (next.slice(0, 5) == '00000') {
        //for part 1, simply push the first character after 0's onto password'
        //password.push(next[5])

        //for part 2, first character after 0's is the position, and second goes in password
        var pos = next[5]
        if (password[pos] == '') {
            password[pos] = next[6]
        }
    }
    i++

    //for cinematic effect
    if (i % 100000 == 0) {
        console.log(i, password, next)
    }
}

//log answer
console.log(password.join(''))
