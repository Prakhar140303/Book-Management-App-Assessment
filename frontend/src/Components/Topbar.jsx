import { useState } from "react";
import { TextField, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, addBook } from "../redux/bookSlice";

const genres = [
  "Fantasy", "Dystopian", "Fiction", "Classic", "Romance",
  "Adventure", "Satire", "Historical", "Psychological", 
  "Epic", "Poetry", "Tragedy", "Philosophy", "Modernist"
];

function Topbar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.books.filters);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", genre: "", status: "Available", year: "" });

  const handleChange = (field) => (event) => {
    dispatch(setFilters({ [field]: event.target.value }));
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    dispatch(addBook(form));
    setOpen(false);
    setForm({ title: "", author: "", genre: "", status: "Available", year: "" });
  };

  return (
    <>
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow mb-4">
        <TextField
          label="Search by title or author"
          variant="outlined"
          size="small"
          className="flex-1"
          value={filters.search}
          onChange={handleChange("search")}
        />

        <TextField
          select
          label="Genre"
          variant="outlined"
          size="small"
          className="w-40"
          value={filters.genre}
          onChange={handleChange("genre")}
        >
          <MenuItem value="all">All</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status"
          variant="outlined"
          size="small"
          className="w-40"
          value={filters.status}
          onChange={handleChange("status")}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Issued">Issued</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          + Add Book
        </Button>
      </div>

      {/* Add Book Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Book</DialogTitle>
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
            select
            label="Genre"
            name="genre"
            value={form.genre}
            onChange={handleFormChange}
            fullWidth
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>{genre}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            select
            name="status"
            value={form.status}
            onChange={handleFormChange}
            fullWidth
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Issued">Issued</MenuItem>
          </TextField>
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add Book
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Topbar;
