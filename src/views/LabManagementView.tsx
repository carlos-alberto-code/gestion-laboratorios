import {Title, Text, Center, Stack} from '@mantine/core';
import {IconTools} from '@tabler/icons-react';

export function LabManagementView() {
    return (
        <Center style={{height: '100%', width: '100%'}}>
            <Stack align="center">
                <IconTools size={48} stroke={1.5}/>
                <Title order={2}>Gestión de Laboratorio</Title>
                <Text c="dimmed">(Vista en construcción)</Text>
            </Stack>
        </Center>
    );
}