let ts = '83306794236525115047370';
let stmnt = '"!Odoo - All your applications in one single solution"';

let multi = 1;
ts.substr(0, 5)
  .split('')
  .forEach((d) => {
    multi *= stmnt[parseInt(d) + 1].charCodeAt(0);
  });

let prefix = multi.toString().substr(1, 4) + stmnt.substring(2, 6);

console.log('password1:', prefix + '57');
console.log('password2:', prefix + '75');
