import { create } from "zustand";

const useAppStore = create((set, get) => ({
  // confirm dialog
  confirmDialog: { open: false, message: "", resolve: null, },
  openConfirmDialog: ({ message = "Are you sure?", }) => {
    return new Promise((resolve) => {
      set({ confirmDialog: { open: true, message, resolve, }, });
    });
  },
  confirmDialogAction: () => {
    const { resolve } = get().confirmDialog;
    if (resolve) resolve(true);
    set({ confirmDialog: { open: false, message: "", resolve: null, }, });
  },

  confirmDialogCancel: () => {
    const { resolve } = get().confirmDialog;
    if (resolve) resolve(false);
    set({ confirmDialog: { open: false, message: "", resolve: null, }, });
  },

  // info dialog
  infoDialog: { open: false, message: "", },
  openInfoDialog: ({ message = "", }) => {
    set({ infoDialog: { open: true, message, }, });
  },

  infoDialogCancel: () => {
    set({ infoDialog: { open: false, message: "", }, });
  },
}));

export default useAppStore;