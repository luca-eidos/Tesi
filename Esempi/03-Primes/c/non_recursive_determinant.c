#include <stdio.h>

#define N 4

double determinant(double a[][N], int n)
{
  int i, j, k, sign = 1;
  double det = 1, pivot, factor;
  double lu[N][N];

  // Copy A to LU
  for (i = 0; i < n; i++)
  {
    for (j = 0; j < n; j++)
    {
      lu[i][j] = a[i][j];
    }
  }

  // Gaussian elimination with partial pivoting
  for (k = 0; k < n - 1; k++)
  {
    pivot = lu[k][k];
    for (i = k + 1; i < n; i++)
    {
      factor = lu[i][k] / pivot;
      lu[i][k] = factor;
      for (j = k + 1; j < n; j++)
      {
        lu[i][j] -= factor * lu[k][j];
      }
    }
  }

  // Compute determinant from U and P
  for (i = 0; i < n; i++)
  {
    det *= lu[i][i];
  }
  if (sign == -1)
  {
    det = -det;
  }

  return det;
}

int main()
{
  double a[N][N] = {{1, 2, 3, 4},
                    {4, 5, 6, 4},
                    {7, 8, 9, 4},
                    {7, 8, 9, 4}};

  printf("Determinant of matrix A: %lf", determinant(a, N));

  return 0;
}