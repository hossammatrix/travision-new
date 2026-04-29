// TreeCore.jsx
import { useEffect } from "react";
import { Card, useTheme, useMediaQuery } from "@mui/material";
import TreeMobileControl from "./control/TreeMobileControl";
import TopHeaderRow from "./control/TopHeaderRow";
import TreeData from "./data/treeData/TreeData";
import TableData from "./data/tableData/TableData";
import { useTreeStore } from "@/context/tree/useScopedTree";

const TreeCore = () => {
    const theme = useTheme();
    const viewMode = useTreeStore((s) => s.viewMode);
    const setDevice = useTreeStore((s) => s.setDevice);

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    useEffect(() => {
        setDevice({ isMobile, isTablet });
    }, [isMobile, isTablet]);

    return (
        <Card sx={{ p: 0, border: "1px solid #ddd" }} variant="outlined">
            <TopHeaderRow />
            <TreeMobileControl />
            {viewMode === "tree" ? <TreeData /> : <TableData />}
        </Card>
    );
};

export default TreeCore;
