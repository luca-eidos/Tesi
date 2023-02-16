#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <stdbool.h>

#define N 120000000

int main()
{
  // printf("Prime numbers less than or equal to %d:\n", N);

  int64_t result = 0;

  bool *prime = (bool *)malloc((N + 1) * sizeof(bool));

  for (int i = 0; i < N; i++)
    prime[i] = true;

  for (int64_t p = 2; p * p <= N; p++)
  {
    // If prime[p] is not changed, then it is a prime
    if (prime[p] == true)
    {
      // Update all multiples of p
      for (int i = p * 2; i <= N; i += p)
        prime[i] = false;
    }
  }

  for (int64_t p = 2; p <= N; p++)
    if (prime[p])
      result++;

  // printf("%ld\n", result);
  return 0;
}