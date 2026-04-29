// treeUtils.js
const fuzzySearch = (text, pattern) => {
  if (!pattern || pattern.trim() === "") return true;
  if (!text) return false;

  return text.toLowerCase().includes(pattern.toLowerCase());
};

/**
 * Recursively filter tree nodes by search term.
 * Returns filtered nodes, matched nodes info, and nodes to expand.
 */
export const filterTreeByFuzzySearch = (nodes, term) => {
  if (!nodes || !Array.isArray(nodes)) return { filteredNodes: [], matchedNodes: [], nodesToExpand: [] };
  if (!term || term.trim() === "") return { filteredNodes: nodes, matchedNodes: [], nodesToExpand: [] };

  const matchedNodes = [];
  const nodesToExpand = new Set();

  const filterNodes = (nodes, parentPath = []) => {
    return nodes.reduce((acc, node) => {
      if (!node) return acc;

      const matched = fuzzySearch(node.nodeName || "", term);

      let filteredChildren = [];
      if (node.children?.length) {
        filteredChildren = filterNodes(node.children, [...parentPath, node.nodeId]);
      }

      if (matched || filteredChildren.length) {
        if (filteredChildren.length) [...parentPath, node.nodeId].forEach(id => nodesToExpand.add(id));
        if (matched) parentPath.forEach(id => nodesToExpand.add(id));

        acc.push({
          ...node,
          children: filteredChildren.length ? filteredChildren : node.children || [],
          isMatch: matched,
          hasMatchingChildren: filteredChildren.length > 0,
        });

        if (matched) matchedNodes.push({ nodeId: node.nodeId, label: node.nodeName, parentPath, score: 1 });
      }

      return acc;
    }, []);
  };

  const filteredNodes = filterNodes(nodes);

  return {
    filteredNodes,
    matchedNodes,
    nodesToExpand: Array.from(nodesToExpand),
  };
};

/**
 * Returns highlight information for a label based on current search term.
 * Produces an array of parts with `highlight: true/false` for UI.
 */
export const getHighlightInfo = (label, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === "" || !label) {
    return { text: label || "", parts: [{ text: label || "", highlight: false }] };
  }

  const labelStr = String(label);
  const labelLower = labelStr.toLowerCase();
  const searchLower = searchTerm.toLowerCase();
  const parts = [];
  let lastIndex = 0;
  let searchIdx = 0;

  for (let i = 0; i < labelLower.length && searchIdx < searchLower.length; i++) {
    if (labelLower[i] === searchLower[searchIdx]) {
      if (lastIndex < i) parts.push({ text: labelStr.substring(lastIndex, i), highlight: false });

      let matchStart = i;
      let matchEnd = i + 1;
      searchIdx++;

      while (matchEnd < labelLower.length && searchIdx < searchLower.length) {
        if (labelLower[matchEnd] === searchLower[searchIdx]) {
          matchEnd++;
          searchIdx++;
        } else break;
      }

      parts.push({ text: labelStr.substring(matchStart, matchEnd), highlight: true });
      lastIndex = matchEnd;
      i = matchEnd - 1;
    }
  }

  if (lastIndex < labelStr.length) parts.push({ text: labelStr.substring(lastIndex), highlight: false });
  return { text: labelStr, parts };
};