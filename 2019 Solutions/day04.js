const input = [165432, 707912];
const range = [];
const diff = input[1] - input[0];
const hopefuls = [];

for (let i = 0; i <= diff; i++) {
  range.push(input[0] + i);
}

range.forEach(val => {
  let possible = checkValidity(val);
  if (possible) {
    hopefuls.push(val);
  }
})

function checkValidity(num) {
  let div = num.toString().split('').map(el => {
    return parseInt(el, 10)
  });
  let double = false;
  let doubleCount = 0;
  let order = true;
  for (let j = 0; j < div.length - 1; j++) {
    if (div[j] > div[j+1]) {
      order = false;
      break;
    } else if (div[j] === div[j+1]) {
      if (div[j+2] === div[j] || div[j-1] === div[j]) {
        double = false;
      } else {
        double = true;
        doubleCount++;
      }
    }
  }
  if (doubleCount > 0 && order) {
    return true;
  } else {
    return false;
  }
}

let qtyOfHope = hopefuls.length;
console.log(qtyOfHope);