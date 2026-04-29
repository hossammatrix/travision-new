// StyledTreeItem.jsx
import { Box } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view";
import {
    IconFolderPlus,
    IconFilter2Check,
} from "@tabler/icons-react";
import { useTreeStore } from "@/context/tree/useScopedTree";

const StyledTreeItem = ({ node, children }) => {
    const getHighlightInfo = useTreeStore((s) => s.getHighlightInfo);
    const highlightInfo = getHighlightInfo(node.nodeName);
    return (
        <TreeItem
            itemId={node.nodeId}
            label={
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:hover .actions": { opacity: 1 },
                    }}
                >
                    {node.is_group === 1 ? (
                        <IconFolderPlus
                            size={20}
                            stroke="none"
                            fill="currentColor"
                            style={{
                                color: "#f5c542",
                                filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                            }}
                        />
                    ) : (
                        <IconFilter2Check
                            size={20}
                            stroke="none"
                            // style={{
                            //     filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                            // }}
                        />
                    )}
                    <span>
                        {highlightInfo.parts.map((part, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: part.highlight
                                        ? "#ffeb3b"
                                        : "transparent",
                                    fontWeight: 600,
                                    borderRadius: "2px",
                                    padding: part.highlight ? "0 1px" : "0",
                                    fontSize: "15px",
                                    color: "#555",
                                }}
                            >
                                {part.text}
                            </span>
                        ))}
                    </span>
                </Box>
            }
            sx={{
                "& .MuiTreeItem-content": {
                    borderRadius: 1,
                    py: "2px",
                },
                "& .MuiTreeItem-content.Mui-selected": {
                    backgroundColor: "#e3f2fd",
                },
                "& .MuiTreeItem-content:hover": {
                    backgroundColor: "#f5f5f5",
                },
            }}
        >
            {children}
        </TreeItem>
    );
};

export default StyledTreeItem;
