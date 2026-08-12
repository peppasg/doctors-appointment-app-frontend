import { useState, useCallback } from "react";

export function useDialogState(initial: boolean = false) {
    const [open, setOpen] = useState<boolean>(initial);

    const openDialog = useCallback(() => setOpen(true), []);
    const closeDialog = useCallback(() => setOpen(false), []);

    return { open, setOpen, openDialog, closeDialog };
}
