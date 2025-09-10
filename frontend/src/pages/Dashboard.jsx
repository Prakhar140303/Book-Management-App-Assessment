import React, { useState, lazy, Suspense } from "react";
import BookTableSkelton from '../Components/Skeletons/BookTableSkeleton.jsx';

// Lazy load components
const Topbar = lazy(() => import("../Components/Topbar"));
const BookTable = lazy(() => import("../components/BookTable"));

function Dashboard() {


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
          <BookTable  />
        </Suspense>

        
      </div>
    </div>
  );
}

export default Dashboard;
