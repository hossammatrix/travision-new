import { Box, CardActions, Typography } from "@mui/material";
import { IconFolderPlus, IconFile } from "@tabler/icons-react";
import { useTreeStore } from "@/context/tree/useScopedTree";

const TreeFooter = () => {
    const selectedNodeIds = useTreeStore((s) => s.selectedNodeIds);
    const originalData = useTreeStore((s) => s.originalData);
    const getCurrentData = useTreeStore((s) => s.getCurrentData);

    const currentData = getCurrentData();

    const findNodePath = (nodes, targetId, path = []) => {
        for (const node of nodes) {
            const newPath = [...path, node.nodeName];

            if (node.nodeId === targetId) return newPath;

            if (node.children) {
                const result = findNodePath(node.children, targetId, newPath);
                if (result) return result;
            }
        }
        return null;
    };

    // Selected paths
    const selectedPaths = selectedNodeIds
        .map((id) => findNodePath(originalData, id)?.join(" / "))
        .filter(Boolean);

    const selectedPathText =
        selectedPaths.length === 1
            ? selectedPaths[0]
            : selectedPaths.length > 1
              ? `${selectedPaths.length} items selected`
              : "";

    const countGroupsAndChildren = (nodes) => {
        let groups = 0;
        let children = 0;

        nodes.forEach((node) => {
            if (node.children?.length) {
                groups++;
                const sub = countGroupsAndChildren(node.children);
                groups += sub.groups;
                children += sub.children;
            } else {
                children++;
            }
        });

        return { groups, children };
    };

    const { groups, children } = countGroupsAndChildren(currentData);

    return (
        <CardActions
            sx={{
                px: 3,
                py: 1,
                borderTop: 1,
                borderColor: "#ccc",
                gap: 2,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconFolderPlus
                    fill="currentColor"
                    stroke="none"
                    size={16}
                    style={{
                        color: "#f5c542",
                        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                    }}
                />
                <Typography variant="body2">{groups}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconFile size={16} />
                <Typography variant="body2">{children}</Typography>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography sx={{ fontWeight:600, fontSize:15 }}>
                    {selectedNodeIds.length > 0
                        ? selectedPathText
                        : "No item selected"}
                </Typography>
            </Box>
        </CardActions>
    );
};

export default TreeFooter;
