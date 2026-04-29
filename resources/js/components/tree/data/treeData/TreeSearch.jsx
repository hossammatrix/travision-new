import {
    TextField,
    InputAdornment,
    IconButton,
    Box,
    Chip,
    Stack,
} from "@mui/material";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useTreeStore } from "@/context/tree/useScopedTree";

const TreeSearch = ({ placeholder = "Search..." }) => {
    const searchTerm = useTreeStore((s) => s.searchTerm);
    const showMobileSearch = useTreeStore((s) => s.showMobileSearch);
    const toggleMobileSearch = useTreeStore((s) => s.toggleMobileSearch);
    const handleSearch = useTreeStore((s) => s.handleSearch);
    const searchResults = useTreeStore((s) => s.searchResults);
    const isMobile = useTreeStore((s) => s.isMobile);

    const handleSearchChange = (e) => handleSearch(e.target.value);
    const handleClearSearch = () => handleSearch("");

    // Mobile collapsed: just search icon
    if (isMobile && !showMobileSearch) {
        return (
            <IconButton onClick={toggleMobileSearch} size="small">
                <IconSearch size={18} />
            </IconButton>
        );
    }

    // Shared TextField props
    const textField = (
        <TextField
            placeholder={placeholder}
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth={isMobile}
            autoFocus={isMobile && showMobileSearch}
            sx={{
                width: isMobile ? "100%" : { sm: 250, md: 300 },
                "& .MuiInputBase-root": {
                    borderRadius: 3,
                    fontSize: "15px",
                    fontWeight: "bold",
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconSearch size={16} />
                    </InputAdornment>
                ),
                endAdornment: searchTerm && (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            onClick={handleClearSearch}
                            edge="end"
                        >
                            <IconX size={16} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );

    return (
        <Box sx={{ width: "100%" }}>
            {isMobile && showMobileSearch ? (
                <Box sx={{ mb: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        {textField}
                        <IconButton onClick={toggleMobileSearch} size="small">
                            <IconX size={18} />
                        </IconButton>
                    </Box>
                    {searchTerm && searchResults.length > 0 && (
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <Chip
                                label={`${searchResults.length} result${searchResults.length !== 1 ? "s" : ""}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        </Stack>
                    )}
                </Box>
            ) : (
                <>
                    {textField}
                    {searchTerm && searchResults.length > 0 && (
                        <Chip
                            label={`${searchResults.length} match${searchResults.length !== 1 ? "es" : ""}`}
                            size="small"
                            sx={{ mt: 0.5, ml: 1 }}
                        />
                    )}
                </>
            )}
        </Box>
    );
};

export default TreeSearch;
