import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/bookSlice";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";

function BookFormModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", author: "", genre: "", status: "available", year: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(addBook(form)).unwrap();
      toast.success("Book added successfully");
      onClose();
      setForm({ title: "", author: "", genre: "", status: "available", year: "" });
    } catch {
      toast.error("Failed to add book");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Book</DialogTitle>
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
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookFormModal;
