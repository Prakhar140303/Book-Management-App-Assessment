import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import BookTableSkelton from '../Components/Skeletons/BookTableSkeleton.jsx';

// Lazy loading the  components 
const Topbar = lazy(() => import("../Components/Topbar"));
const BookTable = lazy(() => import("../components/BookTable"));

function Dashboard() {
  const { page } = useParams();   
  const currentPage = parseInt(page, 10) || 1;

  return (
    <div className="flex w-[100vw]">
      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-start p-4 items-center gap-4">
          <img src="/book.png" alt="icon" className="size-10" />
          <h2 className="text-center text-2xl">Book Management System</h2>
        </div>

        <Suspense fallback={<div>Loading Topbar...</div>}>
          <Topbar />
        </Suspense>

        <Suspense fallback={<BookTableSkelton />}>
          <BookTable page={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}

export default Dashboard;
