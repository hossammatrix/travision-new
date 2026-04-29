import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
} from "@mui/material";
import useAppStore from "@/context/useAppStore";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InfoDialog = ({ open, message, onCancel }) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
            slots={{
                transition: Transition,
            }}
            keepMounted
        >
            <DialogTitle>Info</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} variant="contained" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// =========================
// Container (exported)
// =========================
const InfoDialogContainer = () => {
    const { infoDialog, infoDialogCancel } = useAppStore();
    return (
        <InfoDialog
            open={infoDialog.open}
            message={infoDialog.message}
            onCancel={infoDialogCancel}
        />
    );
};

export default InfoDialogContainer;
