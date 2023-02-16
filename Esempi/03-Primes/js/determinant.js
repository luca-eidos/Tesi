function determinant(a) {
  var n = a.length;
  var det = 0;

  if (n == 2) {
    return a[0][0] * a[1][1] - a[1][0] * a[0][1];
  } else {
    for (var i = 0; i < n; i++) {
      var submatrix = [];
      for (var j = 1; j < n; j++) {
        submatrix.push(
          a[j].filter(function (_, index) {
            return index != i;
          })
        );
      }
      det += (i % 2 == 1 ? -1.0 : 1.0) * a[0][i] * determinant(submatrix);
    }
  }
  return det;
}

var a = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Determinant of matrix A: " + determinant(a));
