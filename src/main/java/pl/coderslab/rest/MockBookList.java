package pl.coderslab.rest;

import java.util.concurrent.CopyOnWriteArrayList;

public class MockBookList {
  private static final CopyOnWriteArrayList<Book> cList = new CopyOnWriteArrayList<>();

  static {
    // Create list of customers
    cList.add(
        new Book.BookBuilder().id()
        .title("Thiniking in Java")
        .isbn("9788324631766")
        .author("Bruce Eckel")
        .publisher("Helion")
        .type("programming")
        .build()
    );
    cList.add(
        new Book.BookBuilder().id()
        .title("Rusz glowa Java.")
        .isbn("9788324627738")
        .author("Sierra Kathy, Bates Bert")
        .publisher("Helion")
        .type("programming")
        .build()
    );
    cList.add(
        new Book.BookBuilder().id()
        .title("Java 2. Podstawy")
        .isbn("9780130819338")
        .author("Cay Horstmann, Gary Cornell")
        .publisher("Helion")
        .type("programming")
        .build()
    );

  }
  
  private MockBookList(){}
  
  public static CopyOnWriteArrayList<Book> getInstance(){
    return cList;
  }
  
}
