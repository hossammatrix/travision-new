import { Menu, MenuItem, Divider } from "@mui/material";
import {
    IconFolderPlus,
    IconTrash,
    IconArrowsMaximize,
    IconArrowsMinimize,
    IconPrinter,
    IconFile,
    IconPencil,
} from "@tabler/icons-react";
import { useTreeStore } from "@/context/tree/useScopedTree";

const TreeMobileMenu = () => {
    const mobileMenuAnchor = useTreeStore((s) => s.mobileMenuAnchor);
    const handleMobileMenuClose = useTreeStore((s) => s.handleMobileMenuClose);
    const handleAddGroup = useTreeStore((s) => s.handleAddGroup);
    const handleAddChild = useTreeStore((s) => s.handleAddChild);
    const handleExpandAll = useTreeStore((s) => s.handleExpandAll);
    const handleCollapseAll = useTreeStore((s) => s.handleCollapseAll);
    const handlePrint = useTreeStore((s) => s.handlePrint);
    const handleDelete = useTreeStore((s) => s.handleDelete);
    const handleEdit = useTreeStore((s) => s.handleEdit);

    return (
        <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            slotProps={{
                paper: {
                    sx: {
                        "& .MuiMenuItem-root": {
                            fontSize: "0.875rem",
                            py: 0.75,
                            minHeight: 32,
                        },
                    },
                },
            }}
        >
            <MenuItem onClick={handleAddGroup}>
                <IconFolderPlus size={16} style={{ marginRight: 8 }} />
                Add Group
            </MenuItem>
            <MenuItem onClick={handleAddChild}>
                <IconFile size={16} style={{ marginRight: 8 }} />
                Add Child
            </MenuItem>
            <MenuItem onClick={handleEdit}>
                <IconPencil size={16} style={{ marginRight: 8 }} />
                Edit
            </MenuItem>
            {/* <Divider />
            <MenuItem onClick={handleExpandAll}>
                <IconArrowsMaximize size={16} style={{ marginRight: 8 }} />
                Expand All
            </MenuItem>
            <MenuItem onClick={handleCollapseAll}>
                <IconArrowsMinimize size={16} style={{ marginRight: 8 }} />
                Collapse All
            </MenuItem> */}
            <Divider />
            <MenuItem onClick={handlePrint}>
                <IconPrinter size={16} style={{ marginRight: 8 }} />
                Print
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
                <IconTrash size={16} style={{ marginRight: 8 }} />
                Delete Selected
            </MenuItem>
        </Menu>
    );
};

export default TreeMobileMenu;
