import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { MainCom } from "../components/MainCom"; // MainCom 경로를 올바르게 가져와야 합니다.

function Main() {
    return (
        <SimpleGrid spacing={3} templateColumns='repeat(minmax(500px, 1fr))'>
            <Box m={6}>
                <MainCom />
            </Box>
        </SimpleGrid>
    );
}

export default Main;