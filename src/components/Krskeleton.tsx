import { SimpleGrid, Flex, Box, Skeleton } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

export default function KrSkeleton() {
    return <SimpleGrid >
        <Box m={5}>

        </Box>
        <Box m={5}>

        </Box>

        <SimpleGrid m={5} columns={2} spacingX='1' spacingY='1'>
            <Box bg='gray.100' height='16'>
                <Skeleton height={16} />
            </Box>
            <Box bg='gray.100' height='16'>
                <Skeleton height={16} />
            </Box>
            <Box bg='gray.100' height='16'>
                <Skeleton height={16} />
            </Box>
            <Box bg='gray.100' height='16'>
                <Skeleton height={16} />
            </Box>

        </SimpleGrid>
  </SimpleGrid>
}