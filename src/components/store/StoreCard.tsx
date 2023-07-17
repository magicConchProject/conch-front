"use client";

import { Box, Card, CardBody, Flex, Stack, Text } from "@chakra-ui/react";

export default function StoreCard({ title, describtion, name }: any) {
    return (
        <Card
            transition="background 0.3s"
            _hover={{
                background: "rgba(236, 236, 241, 255)",
            }}
            shadow={"none"}
            background={"rgba(247, 247, 248, 255)"}
        >
            <CardBody>
                <Stack spacing="1">
                    <Box>
                        <Flex alignItems="center" gap={2}>
                            <Text fontSize="md" as="b">
                                {title}
                            </Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Text fontSize="xs">{name}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="xs">{describtion}</Text>
                    </Box>
                </Stack>
            </CardBody>
            {/* <Stat>
            <StatHelpText>멤버: {memberCount}</StatHelpText>
            <StatHelpText>그룹장: {manager}</StatHelpText>
        </Stat> */}
        </Card>
    );
}
