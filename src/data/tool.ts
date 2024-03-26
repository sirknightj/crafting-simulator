import {Resources} from "./ResourceList";

export interface Tool {
    name: string;
    damage: number;
    durability: number;

    resourcesAvailable: Record<rollId, rollMap>,
}

type rollId = number;
type rollMap = Partial<Record<Resources, weight>>;
type weight = number;
