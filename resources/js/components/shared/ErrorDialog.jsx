import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    DialogActions,
    Alert,
    AlertTitle,
    IconButton,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Slide,
} from "@mui/material";
import { useError } from "@/context/ErrorContext";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function ErrorDialog() {
    const { error, clearError } = useError();

    const renderError = () => {
        if (!error) return null;

        if (typeof error === "object") {
            const hasFieldErrors = Object.keys(error).some(
                (key) => key !== "code" && key !== "title" && key !== "message",
            );

            if (hasFieldErrors) {
                return (
                    <Box sx={{ mt: 1 }}>
                        {Object.entries(error).map(([field, messages], idx) => {
                            if (
                                field === "code" ||
                                field === "title" ||
                                field === "message"
                            )
                                return null;
                            return (
                                <Paper
                                    key={field}
                                    elevation={0}
                                    sx={{
                                        mb: 2,
                                        p: 2,
                                        bgcolor: "#fff3e0",
                                        borderRadius: 2,
                                        borderLeft: "4px solid #ff9800",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            mb: 1,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {field.replace(/_/g, " ")}
                                    </Typography>
                                    <List dense disablePadding>
                                        {Array.isArray(messages) ? (
                                            messages.map((msg, i) => (
                                                <ListItem
                                                    key={i}
                                                    sx={{ py: 0.5 }}
                                                >
                                                    <ListItemText
                                                        primary={msg}
                                                        primaryTypographyProps={{
                                                            variant: "body2",
                                                        }}
                                                    />
                                                </ListItem>
                                            ))
                                        ) : (
                                            <ListItem sx={{ py: 0.5 }}>
                                                <ListItemText
                                                    primary={messages}
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Paper>
                            );
                        })}
                    </Box>
                );
            }

            // Object error with message property
            if (error.message) {
                return (
                    <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }}>
                        <AlertTitle>Details</AlertTitle>
                        {error.message}
                    </Alert>
                );
            }
        }

        // String error
        return (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error}
            </Alert>
        );
    };

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={!!error}
            onClose={clearError}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 20px 35px -8px rgba(0,0,0,0.2)",
                },
            }}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    bgcolor: "#fef2f2",
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <ErrorOutlineIcon sx={{ fontSize: 32, color: "#f44336" }} />
                <Typography
                    variant="h6"
                    component="span"
                    sx={{ flex: 1, fontWeight: 600 }}
                >
                    Operation Failed
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={clearError}
                    sx={{ color: "text.secondary" }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, bgcolor: "#fafafa" }}>
                {renderError()}
            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    py: 2,
                    bgcolor: "#fff",
                    borderTop: 1,
                    borderColor: "divider",
                }}
            >
                <Button
                    onClick={clearError}
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        px: 3,
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
                    }}
                >
                    Got it
                </Button>
            </DialogActions>
        </Dialog>
    );
}
