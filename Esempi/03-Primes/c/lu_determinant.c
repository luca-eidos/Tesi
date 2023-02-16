
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

#define N_DEF 3000

int lu_decompose(double **A, int n, double Tol, int *P)
{
  int i, j, k, imax;
  double maxA, *ptr, absA;

  for (i = 0; i <= n; i++)
    P[i] = i; // Unit permutation matrix, P[n] initialized with n

  for (i = 0; i < n; i++)
  {
    maxA = 0.0;
    imax = i;

    for (k = i; k < n; k++)
      if ((absA = fabs(A[k][i])) > maxA)
      {
        maxA = absA;
        imax = k;
      }

    if (maxA < Tol)
      return 0; // failure, matrix is degenerate

    if (imax != i)
    {
      // pivoting P
      j = P[i];
      P[i] = P[imax];
      P[imax] = j;

      // pivoting rows of A
      ptr = A[i];
      A[i] = A[imax];
      A[imax] = ptr;

      // counting pivots starting from n (for determinant)
      P[n]++;
    }

    for (j = i + 1; j < n; j++)
    {
      A[j][i] /= A[i][i];

      for (k = i + 1; k < n; k++)
        A[j][k] -= A[j][i] * A[i][k];
    }
  }

  return 1; // decomposition done
}

double lu_determinant(double **A, int *P, int n)
{

  double det = A[0][0];

  for (int i = 1; i < n; i++)
    det *= A[i][i];

  return (P[n] - n) % 2 == 0 ? det : -det;
}

void print_matrix(double **A, int n)
{
  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      printf("%lf\t", A[i][j]);
    }
    printf("\n");
  }
}

int main(int argc, char **argv)
{
  int N;
  if (argc == 1)
  {
    N = N_DEF;
  }
  else
  {
    N = atoi(argv[1]);
  }

  double **a = (double **)(malloc(sizeof(double *) * N));
  int p[N + 1];
  srand(time(NULL));

  for (int i = 0; i < N; i++)
  {
    a[i] = (double *)malloc(sizeof(double) * N);
    for (int j = 0; j < N; j++)
    {
      a[i][j] = (double)(rand() % 10 + 1) / 10;
    }
  }

  if (N <= 100)
  {
    print_matrix(a, N);
  }

  if (lu_decompose(a, N, 0.0001, p))
  {
    printf("lu_decompose successful\n");
    if (N <= 100)
    {
      printf("Decomposed matrix:\n");
      print_matrix(a, N);
    }

    printf("Determinant of matrix A: %lf\n", lu_determinant(a, p, N));
  }
  else
  {
    printf("lu_decompose failed\n");
  }

  for (int i = 0; i < N; i++)
    free(a[i]);
  free(a);

  return 0;
}