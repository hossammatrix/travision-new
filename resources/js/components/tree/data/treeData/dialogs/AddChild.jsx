import {
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    Stack,
} from "@mui/material";
import CustumTextField from "@/components/forms/inputs/CustumTextField";
import CustomLabelField from "@/components/forms/inputs/CustomLabelField";
import CustomAutoComplete from "@/components/forms/inputs/CustomAutoComplete";
import { useTreeStore } from "@/context/tree/useScopedTree";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

const AddChildDialog = () => {
    const dialog = useTreeStore((s) => s.dialogs.addChild);
    const closeDialog = useTreeStore((s) => s.closeDialog);
    const selectedNodeIds = useTreeStore((s) => s.selectedNodeIds);
    const treeCategories = useTreeStore((s) => s.treeCategories);
    const settings = useTreeStore((s) => s.settings);

    const form = useForm({
        id: null,
        is_group: null,
        parent_id: null,
        ar_name: null,
        en_name: null,
    });

    const { data, setData, processing, errors, post, reset, clearErrors } =
        form;
    const { response } = usePage().props;

    const getCategoryId = () => {
        const selectedGroupNode = treeCategories.filter((node) =>
            selectedNodeIds.includes(node.id),
        );
        return selectedGroupNode[0]?.id || null;
    };

    useEffect(() => {
        setData("en_name", data.ar_name);
    }, [data.ar_name]);

    // Reset form when dialog opens
    useEffect(() => {
        if (dialog.open) {
            reset();
            clearErrors();
            setData({
                is_group: "0",
                parent_id: getCategoryId(),
            });
        }
    }, [dialog.open]);

    // Handle response
    useEffect(() => {
        if (response?.newNode) {
            closeDialog("addChild");
            reset();
        }
    }, [response]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/tree/${settings.name}`, {
            preserveScroll: true,
            onSuccess: () => {},
        });
    };

    const handleClose = () => {
        closeDialog("addChild");
        reset();
        clearErrors();
    };

    if (!dialog.open) return null;

    return (
        <Dialog
            open={dialog.open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>{settings.addChildTitle}</DialogTitle>

            <DialogContent sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item size={{ xs: 12 }}>
                        <Stack spacing={2.5}>
                            {/* Ar name field */}
                            <FormControl fullWidth error={!!errors.ar_name}>
                                <CustomLabelField
                                    text="Ar name"
                                    htmlFor="ar_name"
                                    required
                                />
                                <CustumTextField
                                    form={form}
                                    name="ar_name"
                                    placeholder={`Enter ${settings.name} name`}
                                    autoFocus
                                />
                            </FormControl>

                            {/* En name field */}
                            <FormControl fullWidth error={!!errors.en_name}>
                                <CustomLabelField
                                    text="En name"
                                    htmlFor="en_name"
                                    required
                                />
                                <CustumTextField
                                    form={form}
                                    name="en_name"
                                    placeholder={`Enter ${settings.name} name`}
                                />
                            </FormControl>

                            {/* Category */}
                            <FormControl fullWidth>
                                <CustomLabelField
                                    text="Category"
                                    htmlFor="parent_id"
                                />
                                <CustomAutoComplete
                                    form={form}
                                    name="parent_id"
                                    options={treeCategories}
                                    placeholder="Select category"
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose} disabled={processing}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={processing}>
                    {processing ? "Saving..." : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddChildDialog;
