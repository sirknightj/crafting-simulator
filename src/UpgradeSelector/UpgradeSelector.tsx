import React, { Component } from 'react';
import UpgradeCard from './UpgradeCard';
import upgradesData from '../data/upgrades.json';
import {Resources} from "../data/ResourceList";

interface Upgrade {
    name: string;
    image: string;
    cost: Partial<Record<Resources, number>>;
    description: string;
}

interface UpgradeSelectorState {
    upgrades: Upgrade[];
}

class UpgradeSelector extends Component<{}, UpgradeSelectorState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            upgrades: upgradesData as Upgrade[],
        };
    }

    handleBuyUpgrade = (upgrade: Upgrade) => {
        // Implement your buy logic here, such as deducting player's currency, updating player's upgrades, etc.
        console.log(`Buying ${upgrade.name} for ${upgrade.cost} currency.`);
    };

    render() {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {this.state.upgrades.map(upgrade => (
                    <UpgradeCard
                        key={upgrade.name}
                        name={upgrade.name}
                        image={upgrade.image}
                        cost={upgrade.cost}
                        description={upgrade.description}
                        onBuy={() => this.handleBuyUpgrade(upgrade)}
                    />
                ))}
            </div>
        );
    }
}

export default UpgradeSelector;
