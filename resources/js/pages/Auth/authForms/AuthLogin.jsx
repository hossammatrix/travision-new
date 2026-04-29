import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomCheckbox from "@/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/forms/theme-elements/CustomFormLabel";
import { useForm } from "@inertiajs/react";

const AuthLogin = ({ title, subtitle, subtext }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <form onSubmit={submit}>
            {title ? (
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "700",
                        mb: 1,
                    }}
                >
                    {title}
                </Typography>
            ) : null}

            {subtext}

            {/* <AuthSocialButtons title="Sign in with" /> */}
            <Box
                sx={{
                    mt: 3,
                }}
            >
                {/* <Divider>
                    <Typography
                        component="span"
                        color="textSecondary"
                        variant="h6"
                        sx={{
                            fontWeight: "400",
                            position: "relative",
                            px: 2,
                        }}
                    >
                        or sign in with
                    </Typography>
                </Divider> */}
            </Box>
            <Stack>
                <Box>
                    <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                    <CustomTextField
                        id="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </Box>
                <Box>
                    <CustomFormLabel htmlFor="password">
                        Password
                    </CustomFormLabel>
                    <CustomTextField
                        id="password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </Box>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        my: 2,
                    }}
                >
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <CustomCheckbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                            }
                            label="Remeber this Device"
                        />
                    </FormGroup>
                    {/* <Typography
                        component={Link}
                        href="/forgot-password"
                        sx={{
                            fontWeight: "500",
                            textDecoration: "none",
                            color: "primary.main",
                        }}
                    >
                        Forgot Password ?
                    </Typography> */}
                </Stack>
            </Stack>
            <Box>
                <Button
                    disabled={processing}
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                >
                    Sign In
                </Button>
            </Box>
            {subtitle}
        </form>
    );
};

export default AuthLogin;
