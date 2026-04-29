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
const LedgerTreeContent = ({
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
const LedgerTree = ({ originalData, treeCategories }) => {
    const tableSettings = {};

    const flattenTree = (nodes = []) => {
        return nodes.flatMap((node) => [
            ...(node.is_group === 0 ? [node] : []),
            ...(node.children ? flattenTree(node.children) : []),
        ]);
    };

    const tableColumns = useMemo(() => {
        return [
            { field: "id", headerName: "ID", width: 50 },
            { field: "ar_name", headerName: "Name", width: 100 },
            {
                field: "category_path",
                headerName: "Category",
                width: 300,
                cellSx: {
                    // bgcolor: "#eee",
                },
            },
            {
                field: "actions",
                headerName: "",
                width: 150,
            },
        ];
    }, []);

    // flatten
    const tableRowsOld = useMemo(() => {
        return flattenTree(originalData);
    }, [originalData]);

    const tableRows = useMemo(() => {
        return flattenTree(originalData).map((row) => ({
            ...row,
            actions: (
                <div style={{ display: "flex", gap: 16 }}>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row)}>Delete</button>
                </div>
            ),
        }));
    }, [originalData]);

    const settings = {
        name: "ledger",
        treeName: "Ledgers",
        title: "Ledgers tree",
        addChildTitle: "Add Ledger",
        addGroupTitle: "Add Ledger Group",
        editChildTitle: "Edit Ledger",
        editGroupTitle: "Edit Ledger Group",
    };

    return (
        <TreeProvider
            originalData={originalData}
            treeCategories={treeCategories}
            settings={settings}
        >
            <LedgerTreeContent
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
    LedgerTree,
    (prevProps, nextProps) => prevProps.originalData === nextProps.originalData,
);

/**
 * 👇 Layout wrapper
 */
MemoizedTree.layout = (page) => <Layout menuItems={menuItems}>{page}</Layout>;

export default MemoizedTree;
