import { TablePagination, CardActions } from "@mui/material";

export default function TableFooter({
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}) {
    return (
        <CardActions>
            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </CardActions>
    );
}
