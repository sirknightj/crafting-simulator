import {Tool} from "./tool";
import {Resource as R} from "./resource";
import {Resources} from "./ResourceList";

export class Dirt {
    public static readonly tools: Tool[] = [
        {
            name: 'none',
            damage: 100,
            durability: Infinity,
            resourcesAvailable: {
                1: {
                    [Resources.DIRT]: 100
                }
            }
        }
    ];

    public static readonly dirt: R = {
        name: 'Wood',
        health: 1250,
    };
}

