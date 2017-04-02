var express = require("express"),
    app     = express(),
    path    = require("path"),
    request = require("request");

app.use("/assets/js", express.static(__dirname + '/assets/js'));
app.use("/assets/css", express.static(__dirname + '/assets/css'));
app.use("/assets/test.json", express.static(__dirname + '/assets/test.json'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/product_list_page.html'));
});
app.get('/getData', function(req, res) {
  var url = "https://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=20&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1";
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        }
    });
});

app.listen(3000);
