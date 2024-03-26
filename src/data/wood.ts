import {Tool} from "./tool";
import {Resource as R} from "./resource";
import {Resources} from "./ResourceList";

export class Wood {
    public static readonly tools: Tool[] = [
        {
            name: 'none',
            damage: 100,
            durability: Infinity,
            resourcesAvailable: {
                1: {
                    [Resources.WOOD]: 100
                }
            }
        }
    ];

    public static readonly branch: R = {
        name: 'Branch',
        health: 800,
    }
}

