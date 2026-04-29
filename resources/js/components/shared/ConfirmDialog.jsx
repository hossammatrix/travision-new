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

const ConfirmDialog = ({ open, message, onConfirm, onCancel }) => {
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
            <DialogTitle>Confirm</DialogTitle>

            <DialogContent>
                <DialogContentText
                    component="div"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>

                <Button onClick={onConfirm} color="error" variant="contained">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialogContainer = () => {
    const { confirmDialog, confirmDialogAction, confirmDialogCancel } =
        useAppStore();

    return (
        <ConfirmDialog
            open={confirmDialog.open}
            message={confirmDialog.message}
            onConfirm={confirmDialogAction}
            onCancel={confirmDialogCancel}
        />
    );
};

export default ConfirmDialogContainer;
