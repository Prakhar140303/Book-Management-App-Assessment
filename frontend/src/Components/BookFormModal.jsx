
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

function BookFormModal({ open, onClose, editingBook }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingBook ? "Edit Book" : "Add Book"}</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <TextField label="Title" defaultValue={editingBook?.title || ""} fullWidth />
        <TextField label="Author" defaultValue={editingBook?.author || ""} fullWidth />
        <TextField label="Genre" defaultValue={editingBook?.genre || ""} fullWidth />
        <TextField label="Published Year" type="number" defaultValue={editingBook?.published || ""} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary">
          {editingBook ? "Save Changes" : "Add Book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookFormModal;
