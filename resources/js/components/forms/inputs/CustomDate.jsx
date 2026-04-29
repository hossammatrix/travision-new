import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

const CustomDate = ({
    form,
    name,
    placeholder = "",
    disabled = false,
    slotProps = {}, // extra slotProps for TextField
    ...props
}) => {
    const value = form.data[name] ? dayjs(form.data[name]) : null;

    const handleDateChange = (newValue) => {
        form.setData(name, newValue ? newValue.format("YYYY-MM-DD") : null);
    };

    return (
        <MobileDatePicker
            value={value}
            closeOnSelect={true}
            onChange={handleDateChange}
            disabled={form.processing || disabled}
            format="YYYY-MM-DD"
            // views={["year", "month"]}
            slotProps={{
                actionBar: {
                    actions: ["clear", "today", "cancel"],
                },
                textField: {
                    error: !!form.errors[name],
                    helperText: form.errors[name],
                    ...slotProps.input, // merge extra props
                },
            }}
            {...props}
        />
    );
};

export default CustomDate;
