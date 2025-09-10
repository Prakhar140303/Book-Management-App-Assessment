import { TableRow, TableCell, Skeleton } from "@mui/material";

function BookTableSkeleton({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }, (_, index) => (
        <TableRow key={index}>
          <TableCell className="w-[16vw] h-[15vh]">
            <Skeleton variant="text" width="100%" />
          </TableCell>
          <TableCell className="w-[16vw] h-[15vh]">
            <Skeleton variant="text" width="100%" />
          </TableCell>
          <TableCell className="w-[16vw] h-[15vh]">
            <Skeleton variant="text" width="100%" />
          </TableCell>
          <TableCell className="w-[16vw] h-[15vh]">
            <Skeleton variant="text" width="100%" />
          </TableCell>
          <TableCell className="w-[16vw] h-[15vh]">
            <Skeleton variant="rectangular" width="100%" height={30} />
          </TableCell>
          <TableCell className="w-[16vw] h-[15vh]">
            <Skeleton variant="rectangular" width="100%" height={30} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default BookTableSkeleton;
