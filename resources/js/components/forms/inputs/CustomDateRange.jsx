import { useState } from "react";
import {
    TextField,
    Dialog,
    DialogContent,
    Box,
    useTheme,
    DialogActions,
    Button,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersActionBar } from "@mui/x-date-pickers/PickersActionBar";
import dayjs from "dayjs";

const CustomDateRange = ({
    form,
    name,
    label,
    disabled = false,
    slotProps = {},
    ...props
}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const dateFormat = "YYYY-MM-DD";
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    // Get values from form data
    const values = form.data[name] || { start: null, end: null };

    const handleDateChange = (key, newValue) => {
        let updatedValues = { ...values };

        // ✅ Handle clear (null value)
        if (!newValue) {
            updatedValues[key] = null;
            form.setData(name, updatedValues);
            return;
        }

        const newDate = dayjs(newValue);

        // ✅ Guard against invalid dates
        if (!newDate.isValid()) {
            updatedValues[key] = null;
            form.setData(name, updatedValues);
            return;
        }

        const formatted = newDate.format(dateFormat);

        if (key === "start") {
            updatedValues.start = formatted;

            // Adjust end if it's before new start
            if (
                updatedValues.end &&
                newDate.isAfter(dayjs(updatedValues.end))
            ) {
                updatedValues.end = formatted;
            }
        }

        if (key === "end") {
            updatedValues.end = formatted;

            // Adjust start if it's after new end
            if (
                updatedValues.start &&
                newDate.isBefore(dayjs(updatedValues.start))
            ) {
                updatedValues.start = formatted;
            }
        }

        form.setData(name, updatedValues);
    };

    const setToday = () => {
        const today = dayjs().format(dateFormat);
        form.setData(name, {
            start: today,
            end: today,
        });
    };

    const displayText =
        values.start && values.end
            ? `${values.start} ➔ ${values.end}`
            : values.start
              ? `${values.start} ➔ To date`
              : values.end
                ? `From date ➔ ${values.end}`
                : "Select date range";

    return (
        <>
            <TextField
                className="mui-input"
                value={displayText}
                onClick={() => !disabled && !form.processing && setOpen(true)}
                fullWidth
                disabled={form.processing || disabled}
                slotProps={{
                    input: {
                        readOnly: true,
                        sx: {
                            cursor:
                                form.processing || disabled
                                    ? "not-allowed"
                                    : "pointer",
                        },
                        ...slotProps.input,
                    },
                }}
                error={!!form.errors[name]}
                helperText={form.errors[name]}
                {...props}
            />

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <Box
                        display="flex"
                        justifyContent="center"
                        gap={3}
                        sx={{
                            flexDirection: isSmallScreen ? "column" : "row",
                            alignItems: "center",
                        }}
                    >
                        {["start", "end"].map((key) => (
                            <Box
                                key={key}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 1, fontWeight: "bold" }}
                                >
                                    {key === "start"
                                        ? "Start date"
                                        : "End date"}
                                </Typography>

                                <DateCalendar
                                    views={["year", "month", "day"]}
                                    value={
                                        values[key] ? dayjs(values[key]) : null
                                    }
                                    onChange={(newValue) =>
                                        handleDateChange(key, newValue)
                                    }
                                />

                                {/* ✅ Action Bar */}
                                <Box display="flex" gap={1} mt={1}>
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            handleDateChange(key, null)
                                        }
                                    >
                                        Clear
                                    </Button>

                                    <Button
                                        size="small"
                                        onClick={() =>
                                            handleDateChange(key, dayjs())
                                        }
                                    >
                                        Today
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: "flex",
                        px: 3,
                        borderTop: "1px solid #ccc",
                    }}
                >
                    <Button variant="contained" color="error" onClick={() => setOpen(false)} sx={{ px: 2 }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomDateRange;
