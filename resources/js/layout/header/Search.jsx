import { useState } from "react";
import {
    Box,
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { IconSearch, IconX } from "@tabler/icons-react";
import menuItems from "../sidebar/menuItems";
import { Link } from "@inertiajs/react";

const Search = () => {
    // drawer top
    const [showDrawer2, setShowDrawer2] = useState(false);
    const [search, setSerach] = useState("");

    const handleDrawerClose2 = () => {
        setShowDrawer2(false);
    };

    const filterRoutes = (rotr, cSearch) => {
        if (rotr.length > 1)
            return rotr.filter((t) =>
                t.title
                    ? t.href
                          .toLocaleLowerCase()
                          .includes(cSearch.toLocaleLowerCase())
                    : "",
            );

        return rotr;
    };
    const searchData = filterRoutes(menuItems, search);

    return (
        <>
            <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                aria-controls="search-menu"
                aria-haspopup="true"
                onClick={() => setShowDrawer2(true)}
                size="large"
            >
                <IconSearch size="16" />
            </IconButton>
            <Dialog
                open={showDrawer2}
                onClose={() => setShowDrawer2(false)}
                fullWidth
                maxWidth={"sm"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ sx: { position: "fixed", top: 30, m: 0 } }}
            >
                <DialogContent className="testdialog">
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            id="tb-search"
                            placeholder="Search here"
                            fullWidth
                            onChange={(e) => setSerach(e.target.value)}
                            slotProps={{
                                htmlInput: { "aria-label": "Search here" },
                            }}
                        />
                        <IconButton size="small" onClick={handleDrawerClose2}>
                            <IconX size="18" />
                        </IconButton>
                    </Stack>
                </DialogContent>
                <Divider />
                <Box
                    sx={{
                        p: 2,
                        maxHeight: "60vh",
                        overflow: "auto",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            p: 1,
                        }}
                    >
                        Quick Page Links
                    </Typography>
                    <Box>
                        <List component="nav">
                            {searchData.map((menu) => {
                                return (
                                    <Box
                                        key={
                                            menu.title
                                                ? menu.id
                                                : menu.subheader
                                        }
                                    >
                                        {menu.title && !menu.children ? (
                                            <ListItemButton
                                                sx={{ py: 0.5, px: 1 }}
                                                href={menu?.href}
                                                component={Link}
                                            >
                                                <ListItemText
                                                    primary={menu.title}
                                                    secondary={menu?.href}
                                                    sx={{ my: 0, py: 0.5 }}
                                                />
                                            </ListItemButton>
                                        ) : (
                                            ""
                                        )}
                                        {menu.children ? (
                                            <>
                                                {menu.children.map((child) => {
                                                    return (
                                                        <ListItemButton
                                                            sx={{
                                                                py: 0.5,
                                                                px: 1,
                                                            }}
                                                            href={child.href}
                                                            component={Link}
                                                            key={
                                                                child.title
                                                                    ? child.id
                                                                    : menu.subheader
                                                            }
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    child.title
                                                                }
                                                                secondary={
                                                                    child.href
                                                                }
                                                                sx={{
                                                                    my: 0,
                                                                    py: 0.5,
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    );
                                                })}
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                );
                            })}
                        </List>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
};

export default Search;
