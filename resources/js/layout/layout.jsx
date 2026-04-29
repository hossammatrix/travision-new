import { Suspense, lazy, useEffect, useContext } from "react";
import { Box, Container } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { router, usePage } from "@inertiajs/react";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Customizer from "./customizer/Customizer";

import { CustomizerContext } from "@/context/customizerContext";
import config from "@/context/config";

import { ErrorProvider, useError } from "@/context/ErrorContext";
import ErrorDialog from "@/components/shared/ErrorDialog";

const ConfirmDialog = lazy(() => import("@/components/shared/ConfirmDialog"));
const InfoDialog = lazy(() => import("@/components/shared/InfoDialog"));

/* -------------------- Layout Fixes -------------------- */

const MainWrapper = styled("div")(() => ({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden", // ✅ prevent global horizontal scroll
}));

const PageWrapper = styled("div")(() => ({
    display: "flex",
    flexGrow: 1,
    minWidth: 0, // ✅ CRITICAL FIX for flex overflow
    flexDirection: "column",
    zIndex: 1,
    width: "100%",
    backgroundColor: "transparent",
    paddingBottom: "60px",
}));

/* -------------------- Layout Content -------------------- */

const LayoutContent = ({ children, menuItems }) => {
    const { activeLayout, isLayout, activeMode, isCollapse } =
        useContext(CustomizerContext);

    const theme = useTheme();
    const MiniSidebarWidth = config.miniSidebarWidth;

    const { showError } = useError();
    const { props } = usePage();

    useEffect(() => {
        const removeError = router.on("error", () => {
            showError(props.errors);
        });

        return () => removeError();
    }, [showError, props.errors]);

    return (
        <MainWrapper
            className={
                activeMode === "dark" ? "darkbg mainwrapper" : "mainwrapper"
            }
        >
            {/* Sidebar */}
            {activeLayout !== "horizontal" && <Sidebar menuItems={menuItems} />}

            {/* Content Area */}
            <PageWrapper
                className="page-wrapper"
                sx={{
                    ...(isCollapse === "mini-sidebar" && {
                        [theme.breakpoints.up("lg")]: {
                            ml: `${MiniSidebarWidth}px`,
                        },
                    }),
                }}
            >
                {/* Header */}
                {activeLayout === "horizontal" ? <Header /> : <Header />}

                {/* Content */}
                <Container
                    sx={{
                        pt: "30px",
                        maxWidth: isLayout === "boxed" ? "lg" : false, // ✅ correct MUI usage
                    }}
                >
                    <Box
                        sx={{
                            minHeight: "calc(100vh - 170px)",
                            width: "100%",
                        }}
                    >
                        <Suspense fallback={null}>
                            <ConfirmDialog />
                            <InfoDialog />
                        </Suspense>

                        {/* 🔥 IMPORTANT: page content should handle its own overflow */}
                        <Box sx={{ width: "100%" }}>{children}</Box>

                        <ErrorDialog />
                    </Box>
                </Container>

                <Customizer />
            </PageWrapper>
        </MainWrapper>
    );
};

/* -------------------- Export Wrapper -------------------- */

export default function Layout({ children, menuItems }) {
    return (
        <ErrorProvider>
            <LayoutContent menuItems={menuItems}>{children}</LayoutContent>
        </ErrorProvider>
    );
}
