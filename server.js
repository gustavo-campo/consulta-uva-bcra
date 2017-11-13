//Usamos request como cliente HTTP por su simplicidad https://github.com/request/request
var request = require('request');
//Cheerio es una implementacion de jQuery para NodeJS https://github.com/cheeriojs/cheerio
var cheerio = require('cheerio');
// Async nos permite utilizar con facilidad funciones para utilizar JS Asincrónico https://github.com/caolan/async
var async   = require('async');
//Módulo estandar para trabajar con el sistema de archivos
var fs      = require('fs');

//en la instancia de async llamamos al metodo parallel, que nos permitira hacer varias consultas en paralelo
//en esta oportunidad hacemos solamente una
async.parallel({
      //uva es el nombre del objeto que creamos y al que le asignamos el callback
      uva: function(callback) {
          //aqui la url del sitio oficial del bcra
          url = 'http://www.bcra.gov.ar/';
          request(url, function(error, response, html){
            if(!error){
              var $ = cheerio.load(html);
              var x = $('#contenedorUVA').children('h3').text().replace('$','').replace(',','.');
              var xxx = "Valor de una UVA al dia de la fecha: $"+ x;
            } else {
              var xxx = "Se produjo un error en la consulta UVA";
            }
            callback(null, xxx);
          })
      }
  }, function(err, results) {
      guardar([ results.uva ]);
      console.log(results.uva);
});

console.log("Generando reporte");

function guardar ( valores ) {
   
   var fecha = new Date();
   
   fs.appendFile('log.txt', valores + ' ... ' + fecha + '\n', encoding='utf8', function (err) {
       if (err) throw err;
   });

}
