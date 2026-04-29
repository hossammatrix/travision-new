import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { IconTable, IconSitemap } from "@tabler/icons-react";
import { useTreeStore } from "@/context/tree/useScopedTree";

const TreeViewToggle = () => {
    const isMobile = useTreeStore((s) => s.isMobile);
    const viewMode = useTreeStore((s) => s.viewMode);
    const handleViewChange = useTreeStore((s) => s.handleViewChange);

    const iconSize = isMobile ? 16 : 18;

    const renderIcon = (Icon, title) => {
        const icon = <Icon size={iconSize} />;
        return <Tooltip title={title}>{icon}</Tooltip>;
    };

    return (
        <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            size="small"
            sx={{ mr: isMobile ? 0 : 1 }}
        >
            <ToggleButton value="table">
                {renderIcon(IconTable, "Table View")}
            </ToggleButton>

            <ToggleButton value="tree">
                {renderIcon(IconSitemap, "Tree View")}
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default TreeViewToggle;
