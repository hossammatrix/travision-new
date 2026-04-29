import { useContext, Suspense, lazy } from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "react-error-boundary";
import RTL from "@/shared/customizer/RTL";
import "@/utils/i18n";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    CustomizerContextProvider,
    CustomizerContext,
} from "@/context/customizerContext";
import { useThemeSettings } from "@/utils/theme/Theme";
import "./style.css";

const appName = import.meta.env.VITE_APP_NAME ?? "Laravel";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div role="alert" style={{ padding: "20px", textAlign: "center" }}>
        <h2>Something went wrong</h2>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Reload page</button>
    </div>
);

const ThemedApp = ({ children }) => {
    const { activeDir } = useContext(CustomizerContext);
    const theme = useThemeSettings(); // Now using the hook correctly

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RTL direction={activeDir}>
                    <CssBaseline />
                    {children}
                </RTL>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
        const page = pages[`./pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Page "${name}" not found`);
        }

        page.default.layout = page.default.layout || ((page) => page);
        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <CustomizerContextProvider>
                    <ThemedApp>
                        <App {...props} />
                    </ThemedApp>
                </CustomizerContextProvider>
            </ErrorBoundary>,
        );

        return () => root.unmount();
    },

    progress: {
        color: "#6e08eb",
        showSpinner: true,
    },
});
