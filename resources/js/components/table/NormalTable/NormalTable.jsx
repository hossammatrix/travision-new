import React, { useState, useMemo, useEffect } from "react";
import { Card } from "@mui/material";
import { useTreeStore } from "@/context/tree/useScopedTree";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableMenus from "./TableMenus";

import { getComparator, filterRows, exportCSV } from "./tableUtils";

export default function NormalTable() {
    const tableColumns = useTreeStore((s) => s.tableColumns) || [];
    const tableRows = useTreeStore((s) => s.tableRows) || [];
    const tableSettings = useTreeStore((s) => s.tableSettings) || {};

    // UI state
    const [searchText, setSearchText] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);

    // ✅ single source of truth
    const [rowsPerPage, setRowsPerPage] = useState(
        tableSettings.rowsPerPage || 10,
    );

    const [anchorColumns, setAnchorColumns] = useState(null);
    const [anchorSettings, setAnchorSettings] = useState(null);

    // ✅ sync visible columns AFTER data arrives
    const [visibleColumns, setVisibleColumns] = useState([]);

    useEffect(() => {
        if (tableColumns.length) {
            setVisibleColumns(tableColumns.map((c) => c.field));
        }
    }, [tableColumns]);

    // 🔍 filtering
    const filtered = useMemo(() => {
        return filterRows(tableRows, tableColumns, visibleColumns, searchText);
    }, [tableRows, tableColumns, visibleColumns, searchText]);

    // 🔃 sorting
    const sorted = useMemo(() => {
        if (!orderBy) return filtered;
        return [...filtered].sort(getComparator(order, orderBy));
    }, [filtered, order, orderBy]);

    // 📄 pagination
    const paginated = useMemo(() => {
        return sorted.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        );
    }, [sorted, page, rowsPerPage]);

    // reset page on filter change
    useEffect(() => {
        setPage(0);
    }, [searchText, visibleColumns]);

    // sort handler
    const handleSort = (field) => {
        const isAsc = orderBy === field && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(field);
    };

    // column toggle
    const toggleColumn = (field) => {
        setVisibleColumns((prev) =>
            prev.includes(field)
                ? prev.filter((f) => f !== field)
                : [...prev, field],
        );
    };

    return (
        <Card>
            {/* HEADER */}
            <TableHeader
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                searchText={searchText}
                setSearchText={setSearchText}
                setAnchorColumns={setAnchorColumns}
                setAnchorSettings={setAnchorSettings}
            />

            {/* MENUS */}
            <TableMenus
                visibleColumns={visibleColumns}
                toggleColumn={toggleColumn}
                anchorColumns={anchorColumns}
                setAnchorColumns={setAnchorColumns}
                anchorSettings={anchorSettings}
                setAnchorSettings={setAnchorSettings}
                dense={dense}
                setDense={setDense}
                onExport={() => exportCSV(tableColumns, visibleColumns, sorted)}
            />

            {/* BODY */}
            <TableBody
                visibleColumns={visibleColumns}
                rows={paginated}
                order={order}
                orderBy={orderBy}
                onSort={handleSort}
                dense={dense}
            />

            {/* FOOTER */}
            <TableFooter
                count={sorted.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(e, p) => setPage(p)}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
            />
        </Card>
    );
}
