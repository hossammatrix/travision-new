import { filterTreeByFuzzySearch, getHighlightInfo } from './fuzzySearch';

export const handleSearch = (get, set, term) => {
  const { originalData } = get();
  set({ searchTerm: term });

  if (!term || term.trim() === "") {
    set({ filteredData: originalData, searchResults: [], expandedItems: [] });
    return;
  }

  const { filteredNodes, matchedNodes, nodesToExpand } = filterTreeByFuzzySearch(originalData, term);
  const allExpandedIds = [...new Set([...nodesToExpand, ...matchedNodes.map(m => m.nodeId)])];

  set({ filteredData: filteredNodes, searchResults: matchedNodes, expandedItems: allExpandedIds });
};

export const getHighlightInfoHelper = (label, searchTerm) => {
  return getHighlightInfo(label, searchTerm);
};

export const getCurrentData = (get) => {
  return get().searchTerm ? get().filteredData : get().originalData;
};

export const findNodesByIds = (nodes, ids, result = []) => {
  nodes.forEach((node) => {
    if (ids.includes(node.nodeId)) {
      result.push(node);
    }
    if (node.children) {
      findNodesByIds(node.children, ids, result);
    }
  });
  return result;
};