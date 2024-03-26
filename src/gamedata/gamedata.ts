import {Wood} from "../data/wood";
import {ResourceData, Resources} from "../data/ResourceList";
import {Tool} from "../data/tool";

type ResourceMap = Record<Resources, ResourceData>;

export class GameData {
    private static instance: GameData;

    private readonly resourceData: ResourceMap;

    private constructor() {
        this.resourceData = this.loadFromLocalStorage();
    }

    private saveToLocalStorage = () => {
        localStorage.setItem('data', JSON.stringify(this.resourceData))
    }

    private loadFromLocalStorage = () => {
        let parsedData: Partial<ResourceMap> = {};
        let storedData = localStorage.getItem('data');

        if (storedData) {
            try {
                parsedData = JSON.parse(storedData);
            } catch (error) {
                console.error('Error parsing data from localStorage:', error);
            }
        }

        Object.values(Resources).forEach(resource => {
            if (!(resource in parsedData)) {
                parsedData[resource as Resources] = {
                    count: 0,
                    gatherProgress: 100,
                    gatherLastIncremented: 0,
                };
            }
        });

        return parsedData as ResourceMap;
    }


    public static getInstance(): GameData {
        if (!GameData.instance) {
            GameData.instance = new GameData();
        }

        return GameData.instance;
    }

    public getResourceCount = (resource: Resources) => {
        const resourceCount = this.resourceData[resource].count;
        if (isNaN(resourceCount)) {
            return 0;
        }
        return resourceCount;
    }

    public gather = (resource: Resources) => {
        if (this.getGatherProgress(resource) !== 0) {
            console.error("Still on cooldown!");
            return;
        }

        const resourceData = this.resourceData[resource];
        resourceData.gatherProgress = 0;
        resourceData.gatherLastIncremented = Date.now()
        this.saveToLocalStorage();
    };

    private collect = (tool: Tool) => {
        for (const [rollId, rollMap] of Object.entries(tool.resourcesAvailable)) {
            console.log(`Roll ID: ${rollId}`);
            let totalWeight = 0;
            for (const weight of Object.values(rollMap)) {
                totalWeight += weight;
            }
            let cumulativeWeight = 0;
            const randomValue = Math.random() * totalWeight;

            for (const [resource, weight] of Object.entries(rollMap)) {
                cumulativeWeight += weight;
                if (randomValue <= cumulativeWeight) {
                    this.resourceData[resource as Resources].count += 1;
                    break;
                }
            }
        }
    }

    public getGatherProgress = (resource: Resources): number => {
        const resourceData = this.resourceData[resource];

        if (!resourceData.gatherLastIncremented) {
            return 0;
        }

        // Calculate remaining cooldown
        if (resource === Resources.WOOD) {
            const now = Date.now();
            const lastIncremented = resourceData.gatherLastIncremented;
            const diffSecs = (now - lastIncremented) / 1000;
            resourceData.gatherLastIncremented = now;

            const newProgress = resourceData.gatherProgress + diffSecs / (Wood.branch.health / Wood.tools[0].damage) * 100;
            resourceData.gatherProgress = Math.min(newProgress, 100);
        }

        if (resourceData.gatherProgress === 100) {
            resourceData.gatherProgress = 0
            resourceData.gatherLastIncremented = 0
            this.collect(Wood.tools[0]);
        }

        this.saveToLocalStorage();
        return resourceData.gatherProgress;
    };
}
