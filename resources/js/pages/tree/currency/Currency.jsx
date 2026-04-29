import { memo, useMemo, useEffect } from "react";
import menuItems from "@/pages/home/menuItems";
import Layout from "@/layout/layout";
import Breadcrumb from "@/shared/breadcrumb/Breadcrumb";
import { Box } from "@mui/material";
import TreeCore from "@/components/tree/TreeCore";
import { TreeProvider, useTreeStore } from "@/context/tree/useScopedTree";
import AddChild from "@/components/tree/data/treeData/dialogs/AddChild";
import AddGroup from "@/components/tree/data/treeData/dialogs/AddGroup";
import EditChild from "@/components/tree/data/treeData/dialogs/EditChild";
import EditGroup from "@/components/tree/data/treeData/dialogs/EditGroup";

/**
 * 👇 Inner component (MUST be inside TreeProvider)
 */
const CurrencyTreeContent = ({
    tableColumns,
    tableRows,
    tableSettings,
    settings,
}) => {
    const setTableColumns = useTreeStore((s) => s.setTableColumns);
    const setTableRows = useTreeStore((s) => s.setTableRows);
    const setTableSettings = useTreeStore((s) => s.setTableSettings);

    setTableColumns(tableColumns);
    setTableRows(tableRows);
    setTableSettings(tableSettings);

    const bCrumb = [{ to: "/", title: "Home" }, { title: settings.treeName }];

    return (
        <Box>
            <Breadcrumb title={settings.title} items={bCrumb} />
            <AddChild />
            <AddGroup />
            <EditChild />
            <EditGroup />
            <TreeCore />
        </Box>
    );
};

/**
 * 👇 Main component
 */
const CurrencyTree = ({ originalData, treeCategories }) => {
    const tableSettings = {};

    const tableColumns = useMemo(() => {
        return [
            { field: "id", headerName: "ID", width: 50 },
            { field: "ar_name", headerName: "Name", width: 100 },
        ];
    }, []);

    // flatten
    const tableRows = useMemo(() => {
        return originalData;
    }, [originalData]);

    const settings = {
        name: "currency",
        treeName: "Currencies",
        title: "Currencies tree",
        addChildTitle: "Add Currency",
        addGroupTitle: "Add Currency Group",
        editChildTitle: "Edit Currency",
        editGroupTitle: "Edit Currency Group",
    };

    return (
        <TreeProvider
            originalData={originalData}
            treeCategories={treeCategories}
            settings={settings}
        >
            <CurrencyTreeContent
                tableColumns={tableColumns}
                tableRows={tableRows}
                tableSettings={tableSettings}
                settings={settings}
            />
        </TreeProvider>
    );
};

/**
 * 👇 Memoized export
 */
const MemoizedTree = memo(
    CurrencyTree,
    (prevProps, nextProps) => prevProps.originalData === nextProps.originalData,
);

/**
 * 👇 Layout wrapper
 */
MemoizedTree.layout = (page) => <Layout menuItems={menuItems}>{page}</Layout>;

export default MemoizedTree;
