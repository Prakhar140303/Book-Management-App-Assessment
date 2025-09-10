import { TextField, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/bookSlice";

const genres = [
  "Fantasy",
  "Dystopian",
  "Fiction",
  "Classic",
  "Romance",
  "Adventure",
  "Satire",
  "Historical",
  "Psychological",
  "Epic",
  "Poetry",
  "Tragedy",
  "Philosophy",
  "Modernist"
];

function Topbar({ onAddBook }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.books.filters);

  const handleChange = (field) => (event) => {
    dispatch(setFilters({ [field]: event.target.value }));
  };
  
  return (
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
        <MenuItem value ="all">
        All
        </MenuItem>
        {
        genres.map((genre)=>{
          
          return (
            <MenuItem value ={genre}>
            {genre}
            </MenuItem>
          )
        })
      }
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

      <Button variant="contained" color="primary" onClick={onAddBook}>
        + Add Book
      </Button>
    </div>
  );
}

export default Topbar;
