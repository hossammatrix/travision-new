import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody as MuiTableBody,
    TableSortLabel,
    TableContainer,
    Paper,
} from "@mui/material";
import { useTreeStore } from "@/context/tree/useScopedTree";

export default function TableBody({
    visibleColumns,
    order,
    rows,
    orderBy,
    onSort,
    dense,
}) {
    const tableSettings = useTreeStore((s) => s.tableSettings);
    const columns = useTreeStore((s) => s.tableColumns);
    const visibleCols = columns.filter((c) => visibleColumns.includes(c.field));

    return (
        <TableContainer
            component={Paper}
            sx={{ maxHeight: tableSettings.height }}
        >
            <Table
                stickyHeader
                size={dense ? "small" : "medium"}
                sx={{ tableLayout: "fixed" }}
            >
                <TableHead
                    sx={{
                        "& .MuiTableCell-root": {
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            bgcolor: "#f5f5f5",
                            p: 1,
                        },
                    }}
                >
                    <TableRow>
                        {visibleCols.map((col) => (
                            <TableCell
                                key={col.field}
                                sx={{ width: col.width }}
                            >
                                <TableSortLabel
                                    active={orderBy === col.field}
                                    direction={
                                        orderBy === col.field ? order : "asc"
                                    }
                                    onClick={() => onSort(col.field)}
                                >
                                    {col.headerName}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <MuiTableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            {visibleCols.map((col) => (
                                <TableCell
                                    key={col.field}
                                    sx={{
                                        fontSize: "16px",
                                        lineHeight: 2,
                                        ...(col.cellSx || {}),
                                    }}
                                >
                                    {row[col.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </MuiTableBody>
            </Table>
        </TableContainer>
    );
}
