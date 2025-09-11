import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, fetchBooks, updateBook } from "../redux/bookSlice";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

function BookTable() {
  const { books, total, limit: reduxLimit, filters } = useSelector(
    (state) => state.books
  );
  const { page } = useParams(); 
  const navigate = useNavigate();

  const currentPage = parseInt(page, 10) || 1; 
  const [limit, setLimit] = useState(reduxLimit || 10);
  const dispatch = useDispatch();

  const [openEdit, setOpenEdit] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "Available",
    year: "",
  });

  useEffect(() => {
    dispatch(fetchBooks({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit, filters]);

  const totalPages = Math.ceil((total || 0) / limit);

  const handleUpdateStatus = async (book) => {
    const status = book.status === "Available" ? "Issue" : "Available";
    const updatedBook = { ...book, status };
    try {
      dispatch(updateBook({ updatedBook }));
      toast.success(`${book.title}'s status updated successfully`);
    } catch (err) {
      toast.error("Failed to update status : ", err);
    }
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      status: book.status,
      year: book.year,
    });
    setOpenEdit(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    try {
      dispatch(updateBook({ updatedBook: { ...editingBook, ...form } }));
      toast.success("Successfully edited");
      setOpenEdit(false);
      setEditingBook(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to edit book content");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-[100vw]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Genre</th>
              <th className="px-4 py-2 text-left">Published</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.genre}</td>
                <td className="px-4 py-2">{book.year}</td>
                <td
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleUpdateStatus(book)}
                >
                  <Chip
                    label={book.status}
                    color={book.status === "Available" ? "success" : "default"}
                  />
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <Button size="small" onClick={() => handleEditClick(book)}>
                    Edit
                  </Button>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(book.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 items-center mt-4">
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => navigate(`/${currentPage - 1}`)}
        >
          Previous
        </Button>

        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "contained" : "outlined"}
              onClick={() => navigate(`/${i + 1}`)}
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => navigate(`/${currentPage + 1}`)}
        >
          Next
        </Button>
      </div>




      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >
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
