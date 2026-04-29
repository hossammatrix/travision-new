import menuItems from "./menuItems";
import Layout from "@/layout/layout";
import Breadcrumb from "@/shared/breadcrumb/Breadcrumb";
import { Box } from "@mui/material";

const bCrumb = [
    {
        to: "/",
        title: "Home",
    },
];

const Home = () => {
    return (
        <Box>
            <Breadcrumb title="Home Page" items={bCrumb} />
        </Box>
    );
};

export default function RootLayout() {
    return (
        <Layout menuItems={menuItems}>
            <Home />
        </Layout>
    );
}
