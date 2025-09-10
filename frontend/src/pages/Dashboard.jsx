import React, { useState, lazy, Suspense } from "react";
import BookTableSkelton from '../Components/Skeletons/BookTableSkeleton.jsx'
// Lazy load components
const Topbar = lazy(() => import("../components/Topbar"));
const BookTable = lazy(() => import("../components/BookTable"));
const BookFormModal = lazy(() => import("../components/BookFormModal"));

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleAddBook = () => {
    setEditingBook(null);
    setOpenModal(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setOpenModal(true);
  };

  return (
    <div className="flex w-full">

      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-start p-4 items-center gap-4">
          <img src="/book.png" alt="icon" className="size-10" />
          <h2 className="text-center text-2xl">Book Management System</h2>
        </div>

        <Suspense fallback={<div>Loading Topbar...</div>}>
          <Topbar onAddBook={handleAddBook} />
        </Suspense>

        <Suspense fallback={<BookTableSkelton/>}>
          <BookTable onEdit={handleEditBook} />
        </Suspense>

        <Suspense fallback={<div>Loading Modal...</div>}>
          <BookFormModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            editingBook={editingBook}
          />
        </Suspense>
      </div>s
    </div>
  );
}

export default Dashboard;
