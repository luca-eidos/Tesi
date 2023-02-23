#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 8

long determinant(int a[N][N], int n)
{
  long det = 0;
  int submatrix[N][N];
  int i, j, k, l, m, o;

  if (n == 2)
  {
    return ((a[0][0] * a[1][1]) - (a[1][0] * a[0][1]));
  }
  else
  {
    for (i = 0; i < n; i++)
    {
      for (j = 0; j < n; j++)
      {
        m = 0;
        for (k = 0; k < n; k++)
        {
          o = 0;
          if (k == i)
          {
            continue;
          }
          for (l = 0; l < N; l++)
          {
            if (l == j)
              continue;
            submatrix[m][o++] = a[k][l];
          }
          m++;
        }

        det += ((i + j) % 2 == 1 ? -1.0 : 1.0) * a[i][j] * determinant(submatrix, n - 1);
      }
    }
  }
  return det;
}

int main()
{
  int a[N][N];
  srand(time(NULL));

  for (int i = 0; i < N; i++)
  {
    for (int j = 0; j < N; j++)
    {
      a[i][j] = rand() % 10;
      printf("%d\t", a[i][j]);
    }
    printf("\n");
  }
  printf("Determinant of matrix A: %ld\n", determinant(a, N));

  return 0;
}