export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const filterRows = (rows, columns, visibleColumns, searchText) => {
  const activeCols = columns.filter((col) =>
    visibleColumns.includes(col.field),
  );

  return rows.filter((row) =>
    activeCols.some((col) =>
      String(row[col.field])
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    ),
  );
};

export const exportCSV = (columns, visibleColumns, rows) => {
  const visibleCols = columns.filter((col) =>
    visibleColumns.includes(col.field),
  );

  const escapeCSV = (val) =>
    `"${String(val).replace(/"/g, '""')}"`;

  const csv = [
    visibleCols.map((c) => escapeCSV(c.headerName)).join(","),
    ...rows.map((row) =>
      visibleCols.map((c) => escapeCSV(row[c.field])).join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "table.csv";
  a.click();
};