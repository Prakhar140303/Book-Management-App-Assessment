import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { updateBook } from "../redux/bookSlice";
import toast from "react-hot-toast";

function BookFormModal({ open, onClose, editingBook }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", author: "", genre: "", year: "" });

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title || "",
        author: editingBook.author || "",
        genre: editingBook.genre || "",
        year: editingBook.year || "",
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!editingBook) return;
    const updatedBook = { ...editingBook, ...form };
    try{
      dispatch(updateBook({ updatedBook }));
      toast.success("Book updated successfully");
    }catch{
      toast.error("Failed to update the book");

    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Author"
          name="author"
          value={form.author}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Published Year"
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookFormModal;
