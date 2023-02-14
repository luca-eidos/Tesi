#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define N 100000000

int SieveOfEratosthenes()
{
  // Create a boolean array "prime[0..N]" and initialize all entries it as true.
  // A value in prime[i] will finally be false if i is Not a prime, else true.
  int result = 0;
  bool prime[N + 1];
  for (int i = 0; i <= N; i++)
    prime[i] = true;

  for (int p = 2; p * p <= N; p++)
  {
    // If prime[p] is not changed, then it is a prime
    if (prime[p] == true)
    {
      // Update all multiples of p
      for (int i = p * 2; i <= N; i += p)
        prime[i] = false;
    }
  }

  // Print all prime numbers
  for (int p = 2; p <= N; p++)
    if (prime[p])
      result++;

  return result;
}

// Driver code
int main()
{
  printf("Prime numbers less than or equal to %d: %d", N, SieveOfEratosthenes());
  return 0;
}