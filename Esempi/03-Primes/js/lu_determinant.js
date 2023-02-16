const N_DEF = 3000;

function lu_decompose(A, n, Tol, P) {
  let i, j, k, imax;
  let maxA, ptr, absA;

  for (i = 0; i <= n; i++) {
    P[i] = i; // Unit permutation matrix, P[n] initialized with n
  }

  for (i = 0; i < n; i++) {
    maxA = 0.0;
    imax = i;

    for (k = i; k < n; k++) {
      absA = Math.abs(A[k][i]);
      if (absA > maxA) {
        maxA = absA;
        imax = k;
      }
    }

    if (maxA < Tol) {
      return 0; // failure, matrix is degenerate
    }

    if (imax != i) {
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

    for (j = i + 1; j < n; j++) {
      A[j][i] /= A[i][i];

      for (k = i + 1; k < n; k++) {
        A[j][k] -= A[j][i] * A[i][k];
      }
    }
  }

  return 1; // decomposition done
}

function lu_determinant(A, P, n) {
  let det = A[0][0];

  for (let i = 1; i < n; i++) {
    det *= A[i][i];
  }

  return (P[n] - n) % 2 == 0 ? det : -det;
}

function print_matrix(A, n) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
      row += `${A[i][j]}\t`;
    }
    console.log(row);
  }
}

function main() {
  let N;
  if (process.argv.length == 2) {
    N = N_DEF;
  } else {
    N = parseInt(process.argv[2]);
  }

  let A = new Array(N);
  let P = new Array(N);
  Math.seedrandom(new Date().getTime());

  for (let i = 0; i < N; i++) {
    A[i] = new Array(N);
    for (let j = 0; j < N; j++) {
      A[i][j] = Math.floor(Math.random() * 10 + 1) / 10;
    }
  }

  if (N <= 100) {
    print_matrix(A, N);
  }

  if (lu_decompose(A, N, 0.0001, P)) {
    console.log("lu_decompose successful");
    if (N <= 100) {
      console.log("Decomposed matrix:");
      print_matrix(A, N);
    }
    console.log(`Determinant of matrix A: ${lu_determinant(A, P, N)}`);
  } else {
    console.log("lu_decompose failed");
  }

  for (let i = 0; i < N; i++) {
    A[i] = null;
  }
}

main();
