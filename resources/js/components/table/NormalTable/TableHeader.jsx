import {
    CardHeader,
    IconButton,
    Typography,
    TextField,
    Box,
} from "@mui/material";
import { IconSearch, IconEye, IconSettings, IconX } from "@tabler/icons-react";
import { useTreeStore } from "@/context/tree/useScopedTree";

export default function TableHeader({
    searchOpen,
    setSearchOpen,
    searchText,
    setSearchText,
    setAnchorColumns,
    setAnchorSettings,
}) {
    const tableSettings = useTreeStore((s) => s.tableSettings);
    return (
        <CardHeader
            title={
                searchOpen ? (
                    <Box display="flex" gap={1}>
                        <TextField
                            fullWidth
                            size="small"
                            autoFocus
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <IconButton onClick={() => setSearchOpen(false)}>
                            <IconX size={18} />
                        </IconButton>
                    </Box>
                ) : (
                    <Typography variant="h6">{tableSettings.title}</Typography>
                )
            }
            action={
                !searchOpen && (
                    <Box>
                        <IconButton onClick={() => setSearchOpen(true)}>
                            <IconSearch size={18} />
                        </IconButton>
                        <IconButton
                            onClick={(e) => setAnchorColumns(e.currentTarget)}
                        >
                            <IconEye size={18} />
                        </IconButton>
                        <IconButton
                            onClick={(e) => setAnchorSettings(e.currentTarget)}
                        >
                            <IconSettings size={18} />
                        </IconButton>
                    </Box>
                )
            }
        />
    );
}
