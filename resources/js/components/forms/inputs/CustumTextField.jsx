import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
        color: theme.palette.text.secondary,
        opacity: "0.5",
    },
    "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
        color: theme.palette.text.secondary,
        opacity: "1",
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.grey[200],
    },
    "& .MuiInputBase-root": {
        fontSize: "15px",
        fontWeight: 600,
        // color: '#555',
    },
}));

/*
  add to parent component
  slotProps={{
      input: {
          readOnly: true,
          disabled: true,
          style: { color: "gray" },
      },
  }}
*/

const CustumTextField = ({ form, name, ...props }) => {
    return (
        <StyledTextField
            id={name}
            value={form.data[name] || ""}
            onChange={(e) => form.setData(name, e.target.value)}
            error={!!form.errors[name]}
            helperText={form.errors[name]}
            disabled={form.processing || false}
            {...props}
        />
    );
};

export default CustumTextField;
