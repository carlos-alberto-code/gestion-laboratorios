import {Modal, Title, Box} from '@mantine/core';
import type {InventoryItem} from "../../types/inventory.ts";
import {ItemForm} from "./ItemForm.tsx";

interface EditModalFormProps {
    item: InventoryItem | null;
    opened: boolean;
    onClose: () => void;
    onSubmit: (data: InventoryItem) => void;
    isLoading?: boolean;
}

export function EditModalForm(
    {
        item,
        opened,
        onClose,
        onSubmit,
        isLoading = false
    }: EditModalFormProps
) {

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Title order={3}>
                    {item ? `Editar: ${item.nombre}` : 'Editar Elemento'}
                </Title>
            }
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            closeOnClickOutside={!isLoading}
            closeOnEscape={!isLoading}
        >
            <Box pt="sm">
                <ItemForm
                    item={item}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    isLoading={isLoading}
                />
            </Box>
        </Modal>
    );
}