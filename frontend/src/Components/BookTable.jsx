import { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, fetchBooks, updateBook } from "../redux/bookSlice";
import toast from "react-hot-toast";

function BookTable() {
  const { books, total, limit: reduxLimit, filters } = useSelector((state) => state.books);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(reduxLimit || 10);
  const dispatch = useDispatch();

  const [openEdit, setOpenEdit] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form, setForm] = useState({ title: "", author: "", genre: "", status: "Available", year: "" });

  useEffect(() => {
    dispatch(fetchBooks({ page, limit }));
  }, [dispatch, page, limit, filters]);

  const totalPages = Math.ceil((total || 0) / limit);

  const handleUpdateStatus = (book) => {
    const status = book.status === "Available" ? "Issue" : "Available";
    const updatedBook = { ...book, status };
    try{
      dispatch(updateBook({ updatedBook }));
      toast.success(`${book.title}'s status updated successfully`)
    }catch(err){
      toast.error('Failed to update status');
    }
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
    setForm({ title: book.title, author: book.author, genre: book.genre, status: book.status, year: book.year });
    setOpenEdit(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    dispatch(updateBook({ updatedBook: { ...editingBook, ...form } }));
    setOpenEdit(false);
    setEditingBook(null);
  };
  const handleDelete = (id)=>{
    dispatch(deleteBook(id)); 
  }
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Table>
        <TableHead>
          <TableRow>
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
              <TableCell onClick={() => handleUpdateStatus(book)} className="hover:cursor-pointer">
                <Chip
                  label={book.status}
                  color={book.status === "Available" ? "success" : "default"}
                />
              </TableCell>
              <TableCell>
                <Button size="small" onClick={() => handleEditClick(book)}>
                  Edit
                </Button>
                <IconButton aria-label="delete" size="small" onClick={()=>handleDelete(book.id)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 items-center mt-4">
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

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Author"
            name="author"
            value={form.author}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Genre"
            name="genre"
            value={form.genre}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Published Year"
            name="year"
            type="number"
            value={form.year}
            onChange={handleFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookTable;
