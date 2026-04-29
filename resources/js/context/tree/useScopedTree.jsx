import { createContext, useContext, useRef, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
    handleSearch,
    getHighlightInfoHelper,
    getCurrentData,
} from "./helpers/treeSearchHelpers";

import {
    handleAddGroup,
    handleAddChild,
    handleEdit,
    handleDelete,
    handlePrint,
} from "./helpers/treeActionHelpers";

// 🔥 Factory with persist
const createTreeStore = (treeKey) =>
    create(
        persist(
            (set, get) => ({
                isMobile: false,
                isTablet: false,
                searchTerm: "",
                viewMode: "tree",
                mobileMenuAnchor: null,
                showMobileSearch: false,
                expandedItems: [],
                allNodeIds: [],
                settings: {},
                originalData: [],
                treeCategories: [],
                filteredData: [],
                searchResults: [],
                selectedNodeIds: [],
                // table view
                tableColumns: [],
                tableRows: [],
                tableSettings: {
                  title: "Table view",  
                  height: 400,
                  rowsPerPage: 25,
                },

                dialogs: {
                    addGroup: { open: false },
                    addChild: { open: false },
                    editGroup: { open: false, node: null },
                    editChild: { open: false, node: null },
                    delete: { open: false },
                },

                // setters
                setDevice: ({ isMobile, isTablet }) =>
                    set({ isMobile, isTablet }),
                setSearchTerm: (term) => set({ searchTerm: term }),
                setViewMode: (mode) => set({ viewMode: mode }),
                setMobileMenuAnchor: (anchor) =>
                    set({ mobileMenuAnchor: anchor }),
                setShowMobileSearch: (show) => set({ showMobileSearch: show }),
                setExpandedItems: (items) => set({ expandedItems: items }),
                setAllNodeIds: (ids) => set({ allNodeIds: ids }),
                setSettings: (data) => set({ settings: data }),
                setOriginalData: (data) => set({ originalData: data }),
                setTreeCategories: (data) => set({ treeCategories: data }),
                setFilteredData: (data) => set({ filteredData: data }),
                // for table view
                setTableColumns: (data) => set({ tableColumns: data }),
                setTableRows: (data) => set({ tableRows: data }),
                setTableSettings: (data) =>
                    set((state) => ({
                        tableSettings: {
                            ...state.tableSettings,
                            ...data,
                        },
                    })),

                setSelectedNodeIds: (ids) => {
                    set({ selectedNodeIds: Array.isArray(ids) ? ids : [ids] });
                },

                // actions
                getCurrentData: () => getCurrentData(get),
                handleSearch: (term) => handleSearch(get, set, term),

                getHighlightInfo: (label) =>
                    getHighlightInfoHelper(label, get().searchTerm),

                handleExpandAll: () =>
                    set({ expandedItems: get().allNodeIds || [] }),

                handleCollapseAll: () => set({ expandedItems: [] }),

                handleViewChange: (e, newView) => {
                    set({ viewMode: newView });
                },

                handleMobileMenuOpen: (e) =>
                    set({ mobileMenuAnchor: e.currentTarget }),

                handleMobileMenuClose: () => set({ mobileMenuAnchor: null }),

                toggleMobileSearch: () =>
                    set((state) => ({
                        showMobileSearch: !state.showMobileSearch,
                    })),

                handleAddGroup: async () => handleAddGroup(get, set),
                handleAddChild: async () => handleAddChild(get, set),
                handleEdit: async () => handleEdit(get, set),
                handleDelete: async () => handleDelete(get, set),
                handlePrint: async () => handlePrint(get, set),

                openDialog: (key, node = null) =>
                    set((state) => ({
                        dialogs: {
                            ...state.dialogs,
                            [key]: { open: true, node },
                        },
                    })),

                closeDialog: (key) =>
                    set((state) => ({
                        dialogs: {
                            ...state.dialogs,
                            [key]: { open: false, node: null },
                        },
                    })),
            }),
            {
                name: `tree-store-${treeKey}`, // 🔥 unique per tree
                partialize: (state) => ({
                    // ✅ persist only important UI state
                    searchTerm: state.searchTerm,
                    expandedItems: state.expandedItems,
                    selectedNodeIds: state.selectedNodeIds,
                    viewMode: state.viewMode,
                    filteredData: state.filteredData,
                }),
            },
        ),
    );

// context
const TreeStoreContext = createContext(null);

// provider
export const TreeProvider = ({
    children,
    originalData,
    treeCategories,
    settings,
}) => {
    const storeRef = useRef(null);

    if (!storeRef.current) {
        storeRef.current = createTreeStore(settings.name || "default");
    }

    const useStore = storeRef.current;

    const setSettingsState = useStore((s) => s.setSettings);
    const setOriginalDataState = useStore((s) => s.setOriginalData);
    const setTreeCategoriesState = useStore((s) => s.setTreeCategories);
    const setFilteredDataState = useStore((s) => s.setFilteredData);

    // set settings
    useEffect(() => {
        if (settings) {
            setSettingsState(settings);
        }
    }, [settings.treeName]);

    // 🔥 SMART INIT (no reset if user already searched)
    useEffect(() => {
        if (!originalData) return;

        const state = useStore.getState();

        setOriginalDataState(originalData);
        setTreeCategoriesState(treeCategories);
        // setSettingsState(settings);

        // only reset if no search active
        if (!state.searchTerm) {
            setFilteredDataState(originalData);
        }
    }, [originalData]);

    return (
        <TreeStoreContext.Provider value={useStore}>
            {children}
        </TreeStoreContext.Provider>
    );
};

// hook
export const useTreeStore = (selector) => {
    const store = useContext(TreeStoreContext);

    if (!store) {
        throw new Error("useTreeStore must be used inside TreeProvider");
    }

    return store(selector);
};
