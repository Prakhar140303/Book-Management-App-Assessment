import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../redux/bookSlice";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

function BookFormModal({ open, onClose, editingBook }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", author: "", genre: "", status: "available" });

  useEffect(() => {
    if (editingBook) {
      setForm(editingBook);
    } else {
      setForm({ title: "", author: "", genre: "", status: "available" });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingBook) {
      dispatch(updateBook({ updatedBook: form }));
    } else {
      dispatch(addBook(form));
    }
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingBook ? "Edit Book" : "Add Book"}</DialogTitle>
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
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editingBook ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookFormModal;
