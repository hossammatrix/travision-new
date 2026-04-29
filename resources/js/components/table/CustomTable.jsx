import React, { useState, useMemo } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    TextField,
    Menu,
    MenuItem,
    Checkbox,
    ListItemText,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TableSortLabel,
    Box,
    Paper,
} from "@mui/material";

import { IconSettings, IconEye, IconSearch, IconX } from "@tabler/icons-react";

// Helper for sorting
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

export default function FancyTable({ data }) {
    const { title, columns, rows } = data;
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [dense, setDense] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [anchorSettings, setAnchorSettings] = useState(null);
    const [anchorColumns, setAnchorColumns] = useState(null);

    const [visibleColumns, setVisibleColumns] = useState(
        columns.map((col) => col.field),
    );

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");

    // 🔍 Filtering
    const filteredRows = useMemo(() => {
        return rows.filter((row) =>
            columns.some((col) =>
                String(row[col.field])
                    .toLowerCase()
                    .includes(searchText.toLowerCase()),
            ),
        );
    }, [rows, searchText, columns]);

    // 🔃 Sorting
    const sortedRows = useMemo(() => {
        if (!orderBy) return filteredRows;
        return [...filteredRows].sort(getComparator(order, orderBy));
    }, [filteredRows, order, orderBy]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // reset page
    };

    const paginatedRows = useMemo(() => {
        return sortedRows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        );
    }, [sortedRows, page, rowsPerPage]);

    const handleSort = (field) => {
        if (orderBy !== field) {
            setOrder("asc");
            setOrderBy(field);
        } else if (order === "asc") {
            setOrder("desc");
        } else {
            setOrderBy(""); // reset sorting
        }
    };

    // 👁 Toggle columns
    const handleToggleColumn = (field) => {
        setVisibleColumns((prev) =>
            prev.includes(field)
                ? prev.filter((f) => f !== field)
                : [...prev, field],
        );
    };

    // 📥 Export to CSV (Excel)
    const handleExport = () => {
        const visibleCols = columns.filter((col) =>
            visibleColumns.includes(col.field),
        );

        const csv = [
            visibleCols.map((col) => col.headerName).join(","),
            ...sortedRows.map((row) =>
                visibleCols.map((col) => row[col.field]).join(","),
            ),
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "table.csv";
        a.click();
    };

    return (
        <Card sx={{ p: 0, m: 0 }}>
            {/* HEADER */}
            <CardHeader
                sx={{
                    py: 3,
                    px: 3,
                    borderBottom: "1px solid #ccc",
                }}
                title={
                    searchOpen ? (
                        <Box display="flex" alignItems="center" gap={1}>
                            <TextField
                                fullWidth
                                size="small"
                                autoFocus
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <IconButton
                                size="small"
                                onClick={() => setSearchOpen(false)}
                            >
                                <IconX size={18} />
                            </IconButton>
                        </Box>
                    ) : (
                        <Typography variant="h6">{title}</Typography>
                    )
                }
                action={
                    !searchOpen && (
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                                size="small"
                                onClick={() => setSearchOpen(true)}
                            >
                                <IconSearch size={18} />
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={(e) =>
                                    setAnchorColumns(e.currentTarget)
                                }
                            >
                                <IconEye size={18} />
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={(e) =>
                                    setAnchorSettings(e.currentTarget)
                                }
                            >
                                <IconSettings size={18} />
                            </IconButton>
                        </Box>
                    )
                }
            />

            {/* COLUMN VISIBILITY MENU */}
            <Menu
                anchorEl={anchorColumns}
                open={Boolean(anchorColumns)}
                onClose={() => setAnchorColumns(null)}
            >
                {columns.map((col) => (
                    <MenuItem
                        key={col.field}
                        onClick={() => handleToggleColumn(col.field)}
                    >
                        <Checkbox
                            checked={visibleColumns.includes(col.field)}
                        />
                        <ListItemText primary={col.headerName} />
                    </MenuItem>
                ))}
            </Menu>

            {/* SETTINGS MENU */}
            <Menu
                anchorEl={anchorSettings}
                open={Boolean(anchorSettings)}
                onClose={() => setAnchorSettings(null)}
            >
                <MenuItem onClick={() => setDense((prev) => !prev)}>
                    <Checkbox checked={dense} />
                    <ListItemText primary="Dense mode" />
                </MenuItem>
                <MenuItem onClick={handleExport}>Download Excel</MenuItem>
            </Menu>

            {/* TABLE */}
            <CardContent sx={{ p: 0 }}>
                <TableContainer
                    component={Paper}
                    sx={{
                        maxHeight: 400, // 👈 your max height
                        maxWidth: "100%",
                    }}
                >
                    <Table
                        size={dense ? "small" : "medium"}
                        stickyHeader
                        sx={{ tableLayout: "fixed" }}
                    >
                        <TableHead
                            sx={{
                                "& .MuiTableCell-root": {
                                    py: 1,
                                    px: 2,
                                    borderBottom: "1px solid #ccc",
                                    backgroundColor: "#f5f5f5",
                                },
                            }}
                        >
                            <TableRow>
                                {columns
                                    .filter((col) =>
                                        visibleColumns.includes(col.field),
                                    )
                                    .map((col) => (
                                        <TableCell
                                            key={col.field}
                                            sx={{
                                                width: col.width,
                                                minWidth: col.width,
                                                maxWidth: col.width,
                                            }}
                                        >
                                            <TableSortLabel
                                                active={orderBy === col.field}
                                                direction={
                                                    orderBy === col.field
                                                        ? order
                                                        : "asc"
                                                }
                                                onClick={() =>
                                                    handleSort(col.field)
                                                }
                                            >
                                                {col.headerName}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedRows.map((row, idx) => (
                                <TableRow key={idx}>
                                    {columns
                                        .filter((col) =>
                                            visibleColumns.includes(col.field),
                                        )
                                        .map((col) => (
                                            <TableCell
                                                key={col.field}
                                                sx={{
                                                    width: col.width,
                                                    minWidth: col.width,
                                                    maxWidth: col.width,
                                                    overflow: "hidden",
                                                    // textOverflow: "ellipsis",
                                                    whiteSpace: "wrap",
                                                }}
                                            >
                                                {row[col.field]}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

            {/* FOOTER */}
            <CardActions sx={{ px: 2 }}>
                <TablePagination
                    component="div"
                    count={sortedRows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </CardActions>
        </Card>
    );
}
