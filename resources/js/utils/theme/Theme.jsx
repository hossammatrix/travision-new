import _ from "lodash";
import { createTheme } from "@mui/material/styles";
import { useEffect, useContext, useMemo } from "react";
import { CustomizerContext } from "@/context/customizerContext";

import components from "./Components";
import typography from "./Typography";
import { shadows, darkshadows } from "./Shadows";
import { DarkThemeColors } from "./DarkThemeColors";
import { LightThemeColors } from "./LightThemeColors";
import { baseDarkTheme, baselightTheme } from "./DefaultColors";
import * as locales from "@mui/material/locale";

// Make BuildTheme a pure function - remove useContext from it
const BuildTheme = (config) => {
    const { activeMode, isBorderRadius, activeTheme, direction } = config;

    const themeOptions = LightThemeColors.find(
        (theme) => theme.name === activeTheme,
    );
    const darkthemeOptions = DarkThemeColors.find(
        (theme) => theme.name === activeTheme,
    );

    const defaultTheme = activeMode === "dark" ? baseDarkTheme : baselightTheme;
    const defaultShadow = activeMode === "dark" ? darkshadows : shadows;
    const themeSelect = activeMode === "dark" ? darkthemeOptions : themeOptions;

    const baseMode = {
        palette: {
            mode: activeMode,
        },
        shape: {
            borderRadius: isBorderRadius,
        },
        shadows: defaultShadow,
        typography: typography,
    };

    const theme = createTheme(
        _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
            direction: direction,
        }),
    );
    theme.components = components(theme);
    // theme.components = {
    //     ...components(theme),

    //     MuiTableCell: {
    //         styleOverrides: {
    //             root: {
    //                 fontSize: "16px",
    //             },
    //         },
    //     },
    // };

    return theme;
};

// Convert ThemeSettings to a custom hook (starts with "use")
const useThemeSettings = () => {
    const { activeDir, activeTheme, activeMode, isBorderRadius } =
        useContext(CustomizerContext);

    // Memoize the theme to prevent unnecessary recalculations
    const theme = useMemo(() => {
        return BuildTheme({
            direction: activeDir,
            activeTheme: activeTheme,
            activeMode: activeMode,
            isBorderRadius: isBorderRadius,
        });
    }, [activeDir, activeTheme, activeMode, isBorderRadius]);

    // Handle document direction
    useEffect(() => {
        document.dir = activeDir;
    }, [activeDir]);

    return theme;
};

// Export both for backward compatibility if needed
export { useThemeSettings, BuildTheme };
// Optional: keep ThemeSettings as deprecated if needed
export const ThemeSettings = () => {
    console.warn(
        "ThemeSettings is deprecated. Please use useThemeSettings instead.",
    );
    return useThemeSettings();
};
