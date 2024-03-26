import React, { Component } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Tooltip } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import {Resources} from "../data/ResourceList";
import {Utils} from "./Utils";

export type UpgradeCost = Partial<Record<Resources, number>>;

interface Upgrade {
    name: string;
    image: string;
    cost: UpgradeCost;
    description: string;
    onBuy: () => void;
}

interface UpgradeCardState {
    isDialogOpen: boolean;
}

class UpgradeCard extends Component<Upgrade, UpgradeCardState> {
    constructor(props: Upgrade) {
        super(props);
        this.state = {
            isDialogOpen: false,
        };
    }

    handleCardClick = () => {
        this.setState({ isDialogOpen: true });
    };

    handleCloseDialog = () => {
        this.setState({ isDialogOpen: false });
    };

    handleConfirmPurchase = () => {
        this.props.onBuy();
        this.setState({ isDialogOpen: false });
    };

    render() {
        const { name, image, description, cost } = this.props;
        return (
            <div>
                <Tooltip title={description} placement="bottom">
                    <Card style={{ maxWidth: 345, margin: 10 }} onClick={this.handleCardClick}>
                        <CardActionArea>
                            <CardMedia
                                style={{ height: 140 }}
                                image={image}
                                title={name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Tooltip>
                <ConfirmationDialog
                    open={this.state.isDialogOpen}
                    onClose={this.handleCloseDialog}
                    onConfirm={this.handleConfirmPurchase}
                    title={`Buy ${name}`}
                    message={`Do you want to buy ${name} for ${Utils.upgradeCostToString(cost)}?`}
                />
            </div>
        );
    }
}

export default UpgradeCard;
