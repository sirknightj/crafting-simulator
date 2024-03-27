import React, { Component } from 'react';
import { Button } from '@mui/material';
import CraftingModal from './CraftingModal';

interface OpenCraftingModalButtonState {
    open: boolean;
}

class OpenCraftingModalButton extends Component<{}, OpenCraftingModalButtonState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleOpen}>
                    Open Crafting Modal
                </Button>
                <CraftingModal open={open} onClose={this.handleClose} />
            </div>
        );
    }
}

export default OpenCraftingModalButton;
