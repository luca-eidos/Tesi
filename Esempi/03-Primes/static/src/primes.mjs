export function getPrimesCount(){
  let n = 120000000;
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
