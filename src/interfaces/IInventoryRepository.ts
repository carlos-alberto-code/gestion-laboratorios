import type {InventoryItem} from "../types/inventory.ts";

export interface IInventoryRepository {
    getAll(): Promise<InventoryItem[]>;

    create(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem>;

    update(item: InventoryItem): Promise<InventoryItem>;

    delete(id: string): Promise<void>;
}