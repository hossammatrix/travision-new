import { Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { useTreeStore } from "@/context/tree/useScopedTree";

export default function TableMenus({
    visibleColumns,
    toggleColumn,
    anchorColumns,
    setAnchorColumns,
    anchorSettings,
    setAnchorSettings,
    dense,
    setDense,
    onExport,
}) {
    const columns = useTreeStore((s) => s.tableColumns);
    return (
        <>
            <Menu
                anchorEl={anchorColumns}
                open={Boolean(anchorColumns)}
                onClose={() => setAnchorColumns(null)}
            >
                {columns.map((col) => (
                    <MenuItem
                        key={col.field}
                        onClick={() => toggleColumn(col.field)}
                    >
                        <Checkbox
                            checked={visibleColumns.includes(col.field)}
                        />
                        <ListItemText primary={col.headerName} />
                    </MenuItem>
                ))}
            </Menu>

            <Menu
                anchorEl={anchorSettings}
                open={Boolean(anchorSettings)}
                onClose={() => setAnchorSettings(null)}
            >
                <MenuItem onClick={() => setDense((p) => !p)}>
                    <Checkbox checked={dense} />
                    <ListItemText primary="Dense mode" />
                </MenuItem>
                <MenuItem onClick={onExport}>Download CSV</MenuItem>
            </Menu>
        </>
    );
}
