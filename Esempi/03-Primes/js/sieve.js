function sieveOfEratosthenes(n) {
  let primes = new Array(n + 1);
  for (let i = 2; i <= n; i++) {
    primes[i] = true;
  }

  for (let p = 2; p * p <= n; p++) {
    if (primes[p] === true) {
      for (let i = p * 2; i <= n; i += p) {
        primes[i] = false;
      }
    }
  }

  let result = 0;
  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      result++;
    }
  }

  return result;
}

let n = 100000000;
let result = sieveOfEratosthenes(n);
console.log(`Primes numbers less than ${n}: ${result}`);
