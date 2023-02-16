#include <stdio.h>

#define N 3

double determinant(double a[][N], int n)
{
  double det = 0, submatrix[N][N];
  int i, j, k, m;

  if (n == 2)
  {
    return ((a[0][0] * a[1][1]) - (a[1][0] * a[0][1]));
  }
  else
  {
    for (i = 0; i < n; i++)
    {
      m = 0;
      for (j = 1; j < n; j++)
      {
        for (k = 0; k < n; k++)
        {
          if (k == i)
          {
            continue;
          }
          submatrix[m][k] = a[j][k];
        }
        m++;
      }
      det += (i % 2 == 1 ? -1.0 : 1.0) * a[0][i] * determinant(submatrix, n - 1);
    }
  }
  return det;
}

int main()
{
  double a[N][N] = {{1, 2, 3},
                    {4, 5, 6},
                    {7, 8, 9}};

  printf("Determinant of matrix A: %lf", determinant(a, N));

  return 0;
}