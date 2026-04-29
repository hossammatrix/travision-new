import { Stack, Typography } from "@mui/material";
import * as dropdownData from "./data";
import { Link } from "@inertiajs/react";

const QuickLinks = () => {
    return (
        <>
            <Typography variant="h5">Quick Links</Typography>
            <Stack
                spacing={2}
                sx={{
                    mt: 2,
                }}
            >
                {dropdownData.pageLinks.map((pagelink, index) => (
                    <Link
                        href={pagelink.href}
                        key={index}
                        className="hover-text-primary"
                    >
                        <Typography
                            variant="subtitle2"
                            color="textPrimary"
                            className="text-hover"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {pagelink.title}
                        </Typography>
                    </Link>
                ))}
            </Stack>
        </>
    );
};

export default QuickLinks;
