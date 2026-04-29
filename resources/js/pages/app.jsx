// "use client";
// import React, { useContext } from "react";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import RTL from "@/shared/customizer/RTL";
// import { ThemeSettings } from "@/utils/theme/Theme";
// // import "@/utils/i18n";
// import { CustomizerContext } from "@/context/customizerContext";
// import Layout from "@/layout/layout";

// const MyApp = ({ children, menuItems }) => {
//     const theme = ThemeSettings();
//     const { activeDir } = useContext(CustomizerContext);

//     return (
//         <>
//             <ThemeProvider theme={theme}>
//                 <RTL direction={activeDir}>
//                     <CssBaseline />
//                     <Layout
//                         // children={<h3>Welcome to MyApp</h3>}
//                         // menuItems={menuItems}
//                     />
//                     {/* {children} */}
//                 </RTL>
//             </ThemeProvider>
//         </>
//     );
// };

// export default MyApp;
