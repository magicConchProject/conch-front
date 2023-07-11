"use client";

import { Box, Card, CardBody, CardHeader, Flex, Heading, Stack, Stat, StatHelpText, StatLabel, Text } from "@chakra-ui/react";
import LockIcon from "../icons/LockIcon";
import UnLockIcon from "../icons/UnLockIcon";

type Props = {
    name: string;
    joined: boolean;
    memberCount: number;
    manager: string;
};

export default function GroupCard({ name, joined, memberCount, manager }: Props) {
    // console.log(name, joined, memberCount)
    return (
        <>
            {/* <article className={`rounded-md p-3 ${joined ? "bg-neutral-50" : "bg-neutral-100"} flex items-center`}>
                <div className="flex-1">
                    <div className="text-lg font-bold text-gray-700">{name}</div>
                    <div className="text-xs text-gray-400">멤버: {memberCount}</div>
                    <div className="text-xs text-gray-400">그룹장: {manager}</div>
                </div>

                <div>{joined ? <UnLockIcon /> : <LockIcon />}</div>
            </article> */}
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
                                    {name}
                                </Text>
                                <>{joined ? "" : <LockIcon />}</>
                            </Flex>
                        </Box>
                        <Box>
                            <Text fontSize="xs">멤버: {memberCount}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="xs">그룹장: {manager}</Text>
                        </Box>
                    </Stack>
                </CardBody>
                {/* <Stat>
                    <StatHelpText>멤버: {memberCount}</StatHelpText>
                    <StatHelpText>그룹장: {manager}</StatHelpText>
                </Stat> */}
            </Card>
        </>
    );
}
