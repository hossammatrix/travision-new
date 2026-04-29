import {
    Stack,
    IconButton,
    Tooltip,
    Button,
    ButtonGroup,
    Box,
} from "@mui/material";
import {
    IconFolderPlus,
    IconTrash,
    IconPrinter,
    IconFile,
    IconPencil,
} from "@tabler/icons-react";
import { useTreeStore } from "@/context/tree/useScopedTree";
import TreeViewToggle from "./TreeViewToggle";

const TreeControl = () => {
    const handleAddGroup = useTreeStore((s) => s.handleAddGroup);
    const handleAddChild = useTreeStore((s) => s.handleAddChild);
    const handlePrint = useTreeStore((s) => s.handlePrint);
    const handleDelete = useTreeStore((s) => s.handleDelete);
    const handleEdit = useTreeStore((s) => s.handleEdit);
    const isTablet = useTreeStore((s) => s.isTablet);
    const isMobile = useTreeStore((s) => s.isMobile);

    const iconSize = isMobile ? 16 : 18;

    const renderIconButton = (title, Icon, onClick, color) => (
        <Tooltip title={title}>
            <IconButton size="small" onClick={onClick} color={color}>
                <Icon size={iconSize} />
            </IconButton>
        </Tooltip>
    );

    return (
        <Stack
            direction="row"
            alignItems="center"
            flexWrap={isTablet ? "wrap" : "nowrap"}
            sx={{ gap: 1 }}
        >
            {/* Group Actions */}
            <ButtonGroup variant="outlined" size="small" sx={{ mr: 1 }}>
                <Tooltip title="Add Group">
                    <Button
                        startIcon={<IconFolderPlus size={16} />}
                        onClick={handleAddGroup}
                    >
                        {!isTablet && "Add group"}
                    </Button>
                </Tooltip>

                <Tooltip title="Add Child">
                    <Button
                        startIcon={<IconFile size={16} />}
                        onClick={handleAddChild}
                    >
                        {!isTablet && "Add child"}
                    </Button>
                </Tooltip>
            </ButtonGroup>

            {/* Tree Actions */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    border: 1,
                    borderColor: "#ccc",
                    px: 1,
                }}
            >
                {renderIconButton("Edit", IconPencil, handleEdit)}
                {renderIconButton(
                    "Delete Selected",
                    IconTrash,
                    handleDelete,
                    "error",
                )}
            </Box>
            {renderIconButton("Print", IconPrinter, handlePrint)}
            <TreeViewToggle />
        </Stack>
    );
};

export default TreeControl;
