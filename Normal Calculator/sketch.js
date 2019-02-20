
function calculateNormal() {
  var p1x = document.getElementById('p1x').value;
  var p1y = document.getElementById('p1y').value;
  var p1z = document.getElementById('p1z').value;

  var p2x = document.getElementById('p2x').value;
  var p2y = document.getElementById('p2y').value;
  var p2z = document.getElementById('p2z').value;

  var p3x = document.getElementById('p3x').value;
  var p3y = document.getElementById('p3y').value;
  var p3z = document.getElementById('p3z').value;

  var Ux = p2x - p1x;
  var Uy = p2y - p1y;
  var Uz = p2z - p1z;
  var Vx = p3x - p1x;
  var Vy = p3y - p1y;
  var Vz = p3z - p1z;

  var Nx = Uy * Vz - Uz * Vy;
  var Ny = Uz * Vx - Ux * Vz;
  var Nz = Ux * Vy - Uy * Vx;

  var output = Nx + " " + Ny + " " + Nz;

  document.getElementById('output').value = output;

}
