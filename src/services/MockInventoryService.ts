import {mockInventory} from "../mocks/inventory";
import type {IInventoryRepository} from "../interfaces/IInventoryRepository.ts";
import type {InventoryItem} from "../types/inventory.ts";

export class MockInventoryService implements IInventoryRepository {

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getAll(): Promise<InventoryItem[]> {
        await this.delay(500);
        return [...mockInventory];
    }

    async create(newItemData: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
        await this.delay(600);

        // Generamos un ID tipo string (simulado con timestamp)
        const newId = `ITEM-${Date.now()}`;

        const newItem: InventoryItem = {
            ...newItemData,
            id: newId,
            // Aseguramos valores por defecto si vinieran undefined (aunque tu tipo dice que son obligatorios en Omit)
            fechaAdquisicion: newItemData.fechaAdquisicion || new Date(),
            costo: newItemData.costo || 0
        };

        mockInventory.push(newItem);
        return newItem;
    }

    async update(updatedItem: InventoryItem): Promise<InventoryItem> {
        await this.delay(500);

        const index = mockInventory.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
            mockInventory[index] = updatedItem;
            return updatedItem;
        }
        throw new Error("Item no encontrado");
    }

    async delete(id: string): Promise<void> {
        await this.delay(400);

        const index = mockInventory.findIndex(i => i.id === id);
        if (index !== -1) {
            mockInventory.splice(index, 1);
        }
    }
}