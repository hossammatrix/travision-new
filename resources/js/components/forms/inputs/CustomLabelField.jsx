import React from "react";
import { FormLabel } from "@mui/material";

const CustomLabelField = ({ text, sx = {}, ...props }) => {
    return (
        <FormLabel
            sx={{
                mb: 1,
                cursor: "pointer",
                fontWeight: 600,
                // "& .MuiFormLabel-asterisk": {
                //     color: error ? "#d32f2f" : "#f44336",
                // },
                ...sx,
            }}
            {...props}
        >
            {text}
        </FormLabel>
    );
};

export default CustomLabelField;
