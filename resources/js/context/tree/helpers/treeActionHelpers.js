import useAppStore from '@/context/useAppStore';
import { findNodesByIds } from "./treeSearchHelpers";

export const handleAddGroup = (get, set) => {
  const { openDialog } = get();
  openDialog('addGroup')
  set({ mobileMenuAnchor: null });
};

export const handleAddChild = (get, set) => {
  const { openDialog } = get();
  openDialog('addChild')
  set({ mobileMenuAnchor: null });
};

export const handleEdit = async (get, set) => {
  const { selectedNodeIds, openDialog, originalData } = get();

  if (selectedNodeIds.length === 0) {
    await useAppStore.getState().openInfoDialog({
      message: "Select an item to edit",
    });
    return;
  }

  const selectedNodes = findNodesByIds(originalData, selectedNodeIds);


  if (selectedNodeIds.length > 1) {
    await useAppStore.getState().openInfoDialog({
      message: "Select only one item to edit",
    });
    return;
  }

  const node = selectedNodes[0];
  const modalKey = node.is_group === 1 ? "editGroup" : "editChild";
  openDialog(modalKey, node);

  set({ mobileMenuAnchor: null });
};

export const handleDelete = async (get, set) => {

  const { selectedNodeIds, originalData, settings } = get();

  if (selectedNodeIds.length === 0) {
    await useAppStore.getState().openInfoDialog({
      message: "Select an item to delete",
    });
    return;
  }

  const selectedNodes = findNodesByIds(originalData, selectedNodeIds,);

  const names = selectedNodes.map((node) => node.nodeName).join(", ");
  const confirmed = await useAppStore.getState().openConfirmDialog({
    message: `Are you sure you want to delete <b>${names}</b>?`,
  });

  if (!confirmed) return;

  // ✅ actual delete logic

  set({ mobileMenuAnchor: null });
};

export const handlePrint = (get, set) => {
  set({ mobileMenuAnchor: null });
};