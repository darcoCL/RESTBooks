
package pl.coderslab.rest;

import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.function.Predicate;

import javax.validation.Valid;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/books")
public class BookService {

	private final CopyOnWriteArrayList<Book> cList = MockBookList.getInstance();

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Book[] getAllBooks() {
		System.out.println("Entered getAllBooks ");
		return cList.toArray(new Book[0]);
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Book getBook(@PathParam("id") long id) {
		Optional<Book> match = cList.stream().filter(c -> c.getId() == id).findFirst();
		if (match.isPresent()) {
			return match.get();
		} else {
			throw new NotFoundException(new JsonError("Error", "book " + id + " not found"));
		}
	}

	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addBook(Book book) {
		cList.add(book);
		return Response.status(201).entity(book).build();
	}

	@PUT
	@Path("{id}/update")
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateBook(@Valid Book book) {
		int matchIdx = 0;
		Optional<Book> match = cList.stream().filter(c -> c.getId() == book.getId()).findFirst();
		if (match.isPresent()) {
			matchIdx = cList.indexOf(match.get());
			cList.set(matchIdx, book);
			return Response.status(Response.Status.OK).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	@DELETE
	@Path("/remove/{id}")
	public Response deleteBook(@PathParam("id") long id) {
		System.out.println("Request entered remove with id " + id);
		Predicate<Book> book = b -> b.getId() == id;
		if (cList.removeIf(book)) {
			return Response.status(Response.Status.OK).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

}
