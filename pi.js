let pwd = '53464578957';
let ts = '83306794236525115047370';
let stmnt = '"!Odoo - All your applications in one single solution"';
multi = true;
ts.substr(0, 5)
  .split('')
  .forEach(function (j) {
    console.log(
      stmnt[parseInt(j) + 1] + ': ',
      stmnt[parseInt(j) + 1].charCodeAt(0)
    );
    multi *= stmnt[parseInt(j) + 1].charCodeAt(0);
  });
console.log('multi: ', multi);
const first = parseInt(pwd.slice(-11)[0]); // 5
const last = parseInt(pwd.slice(-2)[1]); // 7
const allCount = stmnt.split('All').length; // 2
const tsEnd = ts.slice(-2); // 70

if (first * last * allCount == tsEnd) {
  console.log('if correct');
}
