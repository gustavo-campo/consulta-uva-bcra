var request = require('request');
var cheerio = require('cheerio');
var async   = require('async');
var fs      = require('fs');

async.parallel({
      uva: function(callback) {
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