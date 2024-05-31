import { Box, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Root(){
    const bgColor = useColorModeValue("gray.50", "gray.800");
    return (
        <Box bg={bgColor} minH="100vh">
            <Header />
            <Outlet />
        </Box>
    );
}