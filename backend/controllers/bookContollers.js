import {books} from './../utils/samples.js'

export const getBooks = (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", genre = "all", status = "all" } = req.query;

    let filteredBooks = books;
    console.table(req.query);
    if (search) {
      const lower = search.toLowerCase();
      filteredBooks = filteredBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(lower) ||
          b.author.toLowerCase().includes(lower)
      );
    }
    console.log(filteredBooks);
    if (genre !== "all") {
      filteredBooks = filteredBooks.filter((b) => b.genre === genre);
    }

    if (status !== "all") {
      filteredBooks = filteredBooks.filter((b) => b.status === status);
    }

    const start = (page - 1) * limit;
    const end = page * limit;
    const paginatedBooks = filteredBooks.slice(start, end);

    res.json({
      success: true,
      data: paginatedBooks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: [],
      error: err.message,
    });
  }
};


export const addBook =   (req, res) => {
  try{
    const newBook = { id: Math.random()*100000, ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
  }catch(err){
    res.status(501).json({
      success : false,
      data : []
    })
  }
}

export const updateBook =(req, res) => {
  const updatedBook  =req.body;
  const id = updatedBook.id;
  const index = books.findIndex((b) => b.id == id);
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books[index] = updatedBook;
  res.json(books[index]);
}

export const deleteBook = (req, res) => {
  try{
    const { id } = req.params;

    const index = books.findIndex((b) => b.id == id);
    if (index === -1) return res.status(404).json({ message: "Book not found" });
  
    books.splice(index, 1);
  
    res.json({
      success : true, 
      message: "Book deleted successfully" });

  }catch(err){
    res.status(501).hson("Error deleting the book : ",err);
  }
};
