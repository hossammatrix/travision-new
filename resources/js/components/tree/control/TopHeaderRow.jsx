import { Box, IconButton } from "@mui/material";
import { IconDotsVertical } from "@tabler/icons-react";
import TreeTitle from "./TreeTitle";
import TreeControl from "./TreeControl";
import { useTreeStore } from "@/context/tree/useScopedTree";

const TopHeaderRow = () => {
    const isMobile = useTreeStore((s) => s.isMobile);
    const handleMobileMenuOpen = useTreeStore((s) => s.handleMobileMenuOpen);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                px: { xs: 2, sm: 3 },
                py: { xs: 1.5, sm: 2 },
                borderBottom: 1,
                borderColor: "divider",
                gap: { xs: 1.5, sm: 0 },
            }}
        >
            {/* Left Side */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "space-between", sm: "flex-start" },
                    gap: 1,
                }}
            >
                <TreeTitle />

                {isMobile && (
                    <IconButton onClick={handleMobileMenuOpen} size="small">
                        <IconDotsVertical size={18} />
                    </IconButton>
                )}
            </Box>

            {/* Right Side */}
            {!isMobile && <TreeControl />}
        </Box>
    );
};

export default TopHeaderRow;
