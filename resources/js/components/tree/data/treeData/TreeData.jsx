import { useEffect, useRef } from "react";
import { Box, CardContent } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StyledTreeItem from "./TreeItem";
import CardHeader from "./CardHeader";
import TreeFooter from "@/components/tree/control/TreeFooter";
import { useTreeStore } from "@/context/tree/useScopedTree";

// helpers
const getAllNodeIds = (nodes) => {
    let ids = [];
    nodes.forEach((n) => {
        ids.push(n.nodeId);
        if (n.children) ids = ids.concat(getAllNodeIds(n.children));
    });
    return ids;
};

const renderTree = (nodes) =>
    nodes.map((node) =>
        node.children?.length ? (
            <StyledTreeItem node={node} key={node.nodeId}>
                {renderTree(node.children)}
            </StyledTreeItem>
        ) : (
            <StyledTreeItem node={node} key={node.nodeId} />
        ),
    );

export default function TreeData() {
    const expandedItems = useTreeStore((s) => s.expandedItems);
    const setExpandedItems = useTreeStore((s) => s.setExpandedItems);
    const setAllNodeIds = useTreeStore((s) => s.setAllNodeIds);
    const originalData = useTreeStore((s) => s.originalData);
    const searchTerm = useTreeStore((s) => s.searchTerm);
    const getCurrentData = useTreeStore((s) => s.getCurrentData);
    const selectedNodeIds = useTreeStore((s) => s.selectedNodeIds);
    const setSelectedNodeIds = useTreeStore((s) => s.setSelectedNodeIds);

    const isInitialized = useRef(false);

    // ✅ Initialize once from store data (NOT props)
    useEffect(() => {
        if (!isInitialized.current && originalData.length > 0) {
            setAllNodeIds(getAllNodeIds(originalData));
            isInitialized.current = true;
        }
    }, [originalData, setAllNodeIds]);

    const currentData = getCurrentData();

    if (!currentData || currentData.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
                No items found matching "{searchTerm}"
            </Box>
        );
    }

    return (
        <Box>
            <CardHeader />
            <CardContent sx={{ height: 320, overflow: "auto" }}>
                <SimpleTreeView
                    multiSelect
                    selectedItems={selectedNodeIds}
                    expandedItems={expandedItems}
                    onExpandedItemsChange={(e, ids) => setExpandedItems(ids)}
                    onSelectedItemsChange={(e, ids) => setSelectedNodeIds(ids)}
                    slots={{
                        expandIcon: ChevronRightIcon,
                        collapseIcon: ExpandMoreIcon,
                    }}
                >
                    {renderTree(currentData)}
                </SimpleTreeView>
            </CardContent>
            <TreeFooter />
        </Box>
    );
}
