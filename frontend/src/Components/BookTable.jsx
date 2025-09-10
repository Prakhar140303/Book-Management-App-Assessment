import { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, updateBook } from "./../redux/bookSlice";

function BookTable({ onEdit }) {
  const { books, total, limit: reduxLimit, filters } = useSelector((state) => state.books);
  const [page, setPage] = useState(1); // our pagination is 1-based
  const [limit, setLimit] = useState(reduxLimit || 10);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks({ page, limit }));
  }, [dispatch, page, limit,filters]);

  const totalPages = Math.ceil((total || 0) / limit);
  const handleUpdate = (book) =>{
    const status = book.status === "Available" ? "Issue" :"Available";
    const updatedBook = {...book,status : status};
    dispatch(updateBook({updatedBook}));
  }
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Table>
        <TableHead>
          <TableRow >
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Published</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.year}</TableCell>
              <TableCell onClick={()=>{handleUpdate(book)}} className="hover:cursor-pointer">
                <Chip
                  label={book.status}
                  color={book.status === "Available" ? "success" : "default"}
                  
                />
              </TableCell>
              <TableCell>
                <Button size="small" onClick={() => onEdit(book)}>
                  Edit 
                </Button>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

     {/* pagination */}
      <div className="flex justify-center gap-2  items-center mt-4">
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={page === i + 1 ? "contained" : "outlined"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <Button
          variant="outlined"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default BookTable;
