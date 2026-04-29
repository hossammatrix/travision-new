import { Box, Card, Grid } from "@mui/material";
import Logo from "@/shared/logo/Logo";

// components
import AuthLogin from "./authForms/AuthLogin";

export default function Login2() {
    return (
        <Box
            sx={{
                position: "relative",
                "&:before": {
                    content: '""',
                    background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
                    backgroundSize: "400% 400%",
                    animation: "gradient 15s ease infinite",
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    opacity: "0.3",
                },
            }}
        >
            <Grid
                container
                spacing={0}
                sx={{
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={5}
                    xl={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Card
                        sx={{
                            p: 4,
                            zIndex: 1,
                            width: "450px",
                            maxWidth: "450px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 3, // ← Add margin bottom
                            }}
                        >
                            <Logo />
                        </Box>
                        <AuthLogin
                        // subtitle={
                        //     <Stack
                        //         direction="row"
                        //         spacing={1}
                        //         sx={{
                        //             justifyContent: "center",
                        //             mt: 3,
                        //         }}
                        //     >
                        //         <Typography
                        //             color="textSecondary"
                        //             variant="h6"
                        //             sx={{
                        //                 fontWeight: "500",
                        //             }}
                        //         >
                        //             New to AccSys?
                        //         </Typography>
                        //         <Typography
                        //             component={Link}
                        //             href="/register"
                        //             sx={{
                        //                 fontWeight: "500",
                        //                 textDecoration: "none",
                        //                 color: "primary.main",
                        //                 cursor: "pointer",
                        //                 "&:hover": {
                        //                     textDecoration: "underline",
                        //                 },
                        //             }}
                        //         >
                        //             Create an account
                        //         </Typography>
                        //     </Stack>
                        // }
                        />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
