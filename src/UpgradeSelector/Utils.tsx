import {UpgradeCost} from "./UpgradeCard";

export class Utils {
    private constructor() {
    }

    public static upgradeCostToString = (upgradeCost: UpgradeCost): string => {
        const costStrings: string[] = [];
        const entries = Object.entries(upgradeCost);

        if (entries.length === 0) return 'free'; // If no upgrade cost, return 'free'

        for (let i = 0; i < entries.length; i++) {
            const [resource, cost] = entries[i];
            costStrings.push(`${cost} ${resource}`);
        }

        if (entries.length === 1) {
            // If only one item, no need for 'and'
            return costStrings.join(', ');
        }
        // Remove the last item to prepend 'and'
        const lastItem = costStrings.pop();
        return `${costStrings.join(', ')}, and ${lastItem}`;
    }
}
