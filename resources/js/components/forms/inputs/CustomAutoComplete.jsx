import { Autocomplete, TextField } from "@mui/material";

const CustomAutoComplete = ({
    form,
    name,
    options = [],
    getOptionLabel = (option) => option.name || "",
    ...props
}) => {
    const selected = options.find((opt) => opt.id === form.data[name]) || null;

    return (
        <Autocomplete
            options={options}
            getOptionLabel={getOptionLabel}
            value={selected}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, value) => form.setData(name, value ? value.id : null)}
            filterOptions={(options, { inputValue }) => {
                return options.filter((option) =>
                    option.token
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase()),
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={!!form.errors[name]}
                    helperText={form.errors[name]}
                    {...props}
                />
            )}
            disabled={form.processing || false}
            sx={{
                "& .MuiInputBase-root": {
                    fontSize: "15px",
                    fontWeight: 600,
                    // color: "#2a3547",
                    // backgroundColor: "#feedc9",
                    borderRadius: "8px",
                },
            }}
            slotProps={{
                paper: {
                    sx: {
                        mt: 1, // Margin top to give it some breathing room
                        border: "1px solid #aaa",
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08)",
                        borderRadius: "8px",
                        "& .MuiAutocomplete-listbox": {
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#333b47",
                        },
                    },
                },
            }}
        />
    );
};

export default CustomAutoComplete;
