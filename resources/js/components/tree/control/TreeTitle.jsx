import { IconFolder } from "@tabler/icons-react";
import { CardHeader, Box } from "@mui/material";
import { useTreeStore } from "@/context/tree/useScopedTree";

const TreeTitle = () => {
    const settings = useTreeStore((s) => s.settings);
    const isMobile = useTreeStore((s) => s.isMobile);

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconFolder size={20} />
            <CardHeader
                title={settings.treeName}
                sx={{ p: 0 }}
                slotProps={{
                    title: {
                        variant: isMobile ? "subtitle1" : "h6",
                        fontWeight: isMobile ? 400 : 500,
                    },
                }}
            />
        </Box>
    );
};

export default TreeTitle;
