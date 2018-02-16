$(function(){
  
  
  
}); 



$(function(){    
  var baseUrl = 'http://localhost:8282/';
  var $list = $('ul.books');
  var $form = $('form.save');  
  
  console.log("HI");
  alert("Hi");
  
  function renderList() {

    $.getJSON({
      url: baseUrl + 'books'
    }).done(function (jsonArr) {      
      $list.empty();

      jsonArr.forEach(function (book) {
        $list.append($('<li>', {
            'data-id': book.id
          })
          .append('<span>' + book.title + '</span>')
          .append($('<button>', { 'class': 'delete-btn', text: 'delete' }))
          .append('<div>'));
      })
    });
  }  
  
  
    $list.on("click", "span", function (event) {
      var $span = $(event.currentTarget);

      $.getJSON({
        url: baseUrl + 'books/' + $span.parent($("li")).data("id") // tu nie ma średnika
      }).done(function (json) {
        var $tableHtml = $("<table>");
        for (var key in json) { //dodac var do zmiennej
          $tableHtml.append($("<tr>")
            .append($("<td>", { text: key }))
            .append($("<td>", { text: json[key] })));
        }
        $span.siblings("div").html($tableHtml);
      })
    });
  
  // tu musi byc event podpiety do PARENT!!!
  $list.on("click", "button.delete-btn",  function(){     
    $.ajax({
      url: baseUrl + 'books/remove/' + $(this).parent($("li")).data("id"), // tu nie moze byc srednika 
      type: 'DELETE',      
    }).done(function(){
      renderList();      
    });
  });
  
  
  
  $form.on('submit',function (e) {

    var book = {}; // process form
    var $inputs =  $(this).find('input[type!=submit]');
    $inputs.each(function (index, elem) {
      console.log($(this));
      book[elem.name] = elem.value;
    });

    $.post({
      headers: { // DODAJEMY HEADER
        'Content-Type': 'application/json'
      },
      url: baseUrl + 'books/add',
      data: JSON.stringify(book) // ZAMIENIAMY JSoBJ NA STRING
    }).done(function (data) {
      console.log(data);
      renderList();
    }).fail(function (xhr,status,error) {
      console.log(xhr,status,error);
    });

    this.reset(); //CZYSCIMY POLA
    e.preventDefault(); //po co? skoro i tak moge wyslac puste stringi?
  });
  
  renderList();  
});



/*function getAllBookInfo(){

    $.ajax({
      url: "http://localhost:8282/books",
      type: "get",
      dataType: "json",
      statusCode: { 404: function(){alert( "page not found" );} }

    }).done(function(jsonArr, textStatus, jqXHR) {

      var $table = $("<table><tbody>"); 
      $($table).appendTo(document.querySelector("body"));

      var $headerRow = $("<tr>");
      $headerRow.appendTo($table);

      for(index in jsonArr){
        var bookObj = jsonArr[index];
        var $row = $("<tr>"); 
        $row.appendTo($table.find("tbody")); 

        for(key in bookObj){         
          if(index == 0){
            $("<th>").text(key).appendTo($headerRow);
          }       

          $("<td>").text("index is " + index +  bookObj[key]).appendTo($row);
        }        
      }

    }).fail(function(jqXHR, textStatus, errorThrown ) {  
      alert( "Can't get the books list - check if the server is running. Text status is: " + textStatus + " Error thrown is: " + errorThrown);
    });    
  }
  */
  
 