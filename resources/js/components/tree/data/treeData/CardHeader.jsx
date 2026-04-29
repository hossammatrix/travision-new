import { Box, IconButton, Tooltip } from "@mui/material";
import TreeSearch from "./TreeSearch";
import { useTreeStore } from "@/context/tree/useScopedTree";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";

const CardHeader = () => {
    const showMobileSearch = useTreeStore((s) => s.showMobileSearch);
    const isMobile = useTreeStore((s) => s.isMobile);
    const handleExpandAll = useTreeStore((s) => s.handleExpandAll);
    const handleCollapseAll = useTreeStore((s) => s.handleCollapseAll);

    const iconSize = isMobile ? 16 : 18;

    const ExpandToggle = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Tooltip title="Expand All">
                    <IconButton size="small" onClick={handleExpandAll}>
                        <IconArrowsMaximize size={iconSize} />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Collapse All">
                    <IconButton size="small" onClick={handleCollapseAll}>
                        <IconArrowsMinimize size={iconSize} />
                    </IconButton>
                </Tooltip>
            </Box>
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                borderBottom: 1,
                borderColor: "divider",
                gap: { xs: 1, sm: 0 },
            }}
        >
            {/* Mobile Search Toggle */}
            {isMobile && (
                <>
                    {!showMobileSearch ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <TreeSearch />
                            <ExpandToggle />
                        </Box>
                    ) : (
                        <TreeSearch />
                    )}
                </>
            )}

            {/* Desktop Search and View Toggle */}
            {!isMobile && (
                <>
                    <TreeSearch />
                    <ExpandToggle />
                </>
            )}
        </Box>
    );
};

export default CardHeader;
