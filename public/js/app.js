/*global document, window, alert, console, $ require*/
$(function () {
  var baseUrl = 'http://localhost:8282/';
  var $list = $('ul.books');
  var $form = $('form.save');
  
  
  ///////////////// list all books ///////////////////////////////////////

  // when JSON array with books is loaded, create a list of books
  function renderList() {
    
    $.getJSON({
      url: baseUrl + 'books'  // no semicolon here
      
    }).done(function (jsonArr) {
      $list.empty();
      
      jsonArr.forEach(function (book) {
        $list.append($('<li>', { 'data-id': book.id }) // li attribute stores the book's id
             .append('<span>' + book.title + '</span>')
             .append($('<button>', { 'class': 'delete-btn', text: 'delete'}))
             .append('<div>')); // div to store table w/h book details
      })
    });
  }
  
  ///////////////// get book's details ///////////////////////////////////////

// when a (future) span is clicked book details are revealed
  $list.on("click", "span", function (event) {
    var $span = $(event.currentTarget);

    $.getJSON({
      url: baseUrl + 'books/' + $span.parent($("li")).data("id") // no semicolon here
      
    }).done(function (jsonBook) {
      //create table to list book properties
      var $tableHtml = $("<table><tbody>");
      
      for (var key in jsonBook) { 
        $tableHtml.append($("<tr>")
                  .append($("<td>", { text: key }))
                  .append($("<td>", { text: jsonBook[key]})));
      }
      
      $span.siblings("div").html($tableHtml); // append table on the sibling div 
    })
  });

  ///////////////// delete book ///////////////////////////////////////
  
  // the parent list will handle the button's bubbling event
  $list.on("click", "button.delete-btn", function () {
    
    $.ajax({
      url: baseUrl + 'books/remove/' + $(this).parent($("li")).data("id"), // add id from button's parent li
      type: 'DELETE', // NOTE: the method
    }).done(function () {
      renderList(); // refresh list after deletion
    });
  });

  ///////////////// add a book ///////////////////////////////////////

  $form.on('submit', function (e) {

    var book = {}; 
    var $textInputs = $(this).find('input[type!=submit]');
    
    $textInputs.each(function (index, elem) {
      book[elem.name] = elem.value; // create a JS book object
    });
    // console.log(book); view the book

    
    $.post({   // send book data with POST as json
      headers: { 'Content-Type': 'application/json' },
      url: baseUrl + 'books/add',
      data: JSON.stringify(book) // ZAMIENIAMY JSobject NA STRING
      
    }).done(function (data) {
      //console.log(data); - will show the added object with its id
      renderList();
      
    }).fail(function (xhr, status, error) {
      console.log(xhr, status, error);
    });

    this.reset(); //clean the form text inputs
    e.preventDefault(); 
  });
  
  ///////////////////////////////////////////////

  renderList(); // dispalys the list when page is first loaded

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
