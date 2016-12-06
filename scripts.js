function request(method,url,args) {
  $.ajax({
    method: method,
    url: url,
    data: args
  }).done( (response) => {
    console.log(response);
  });
}

request('GET','http://httpbin.org/get',{a:1,b:'two',c:'3'});
