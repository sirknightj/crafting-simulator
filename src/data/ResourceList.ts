export enum Resources {
    WOOD = 'wood',
    DIRT = 'dirt'
}

export interface ResourceData {
    count: number;
    gatherProgress: number;
    gatherLastIncremented: number;
}
