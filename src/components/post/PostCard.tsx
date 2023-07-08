'use client';

import moment from 'moment';
import EyeIcon from '../icons/EyeIcon';
import WriterIcon from '../icons/WriterIcon';
import { Box, Card, CardBody, Flex, Stack, Text } from '@chakra-ui/react';

type Props = {
    title: string;
    postDate: Date;
    views: number;
    writer: string;
};

export default function PostCard({ title, postDate, writer, views }: Props) {
    return (
        <Card
            transition="background 0.3s"
            _hover={{
                background: 'rgba(0,0,0,0.08)',
            }}
            rounded={'none'}
            shadow={'none'}
        >
            <CardBody p="2">
                <Stack spacing="1">
                    <Box>
                        <Flex alignItems="center" gap={2}>
                            <Text fontSize="md" as="b">
                                {title}
                            </Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex gap={2}>
                            <Text fontSize="xs" color="gray">
                                <Flex alignItems={'center'} gap={1}>
                                    {moment(postDate).format('YYYY-MM-DD')}
                                </Flex>
                            </Text>
                            <Text fontSize="xs" color="gray">
                                <Flex alignItems={'center'} gap={1}>
                                    <WriterIcon /> {writer}
                                </Flex>
                            </Text>
                            <Text fontSize="xs" color="gray">
                                <Flex alignItems={'center'} gap={1}>
                                    <EyeIcon /> {views}
                                </Flex>
                            </Text>
                        </Flex>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
        // <article className="rounded-md p-2 bg-neutral-50 flex items-center hover:bg-neutral-100">
        //     <div className="flex-1 flex justify-between">
        //         {/* 타이틀, 작성자, 조회수 */}
        //         <section>
        //             <h1 className="text-md font-bold text-gray-700">{title}</h1>

        //             <section className="flex gap-2">
        //                 <p className="text-xs text-gray-400 flex items-center gap-1"><WriterIcon/> {writer}</p>
        //                 <p className="text-xs text-gray-400 flex items-center gap-1"><EyeIcon/> {views}</p>
        //             </section>
        //         </section>
        //         {/* 작성일 */}
        //         <section>
        //             <p className="text-xs text-gray-400">{moment(postDate).format("YYYY-MM-DD")}</p>
        //         </section>
        //     </div>
        // </article>
    );
}
