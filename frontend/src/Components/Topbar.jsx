import { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/bookSlice";
import BookFormModal from "./AddBookModal.jsx"; 

const genres = [
  "Fantasy", "Dystopian", "Fiction", "Classic", "Romance",
  "Adventure", "Satire", "Historical", "Psychological", 
  "Epic", "Poetry", "Tragedy", "Philosophy", "Modernist"
];

function Topbar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.books.filters);

  const [open, setOpen] = useState(false);

  const handleChange = (field) => (event) => {
    dispatch(setFilters({ [field]: event.target.value }));
  };

  return (
    <>
      <div className="flex w-full items-center gap-4 bg-white p-4 rounded-lg shadow mb-4">
        <TextField
          label="Search by title or author"
          variant="outlined"
          size="small"
          className="flex-[3]"
          value={filters.search}
          onChange={handleChange("search")}
        />

        <TextField
          select
          label="Genre"
          variant="outlined"
          size="small"
          className="flex-[1]"
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
          className="flex-[1]"
          value={filters.status}
          onChange={handleChange("status")}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Issued">Issued</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ height: "6vh", width: "15vw", fontSize: "0.75rem" }}>
          + Add Book
        </Button>
      </div>

      <BookFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Topbar;
