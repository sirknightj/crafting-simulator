import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

class ConfirmationDialog extends Component<ConfirmationDialogProps> {
    render() {
        const { open, onClose, onConfirm, title, message } = this.props;
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{message}</DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ConfirmationDialog;
