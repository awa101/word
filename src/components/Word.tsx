
import {
  Box,
  SimpleGrid,
  useColorModeValue

} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Word() {
  return (
    <SimpleGrid m={1} columns={2} spacingX='1' spacingY='1'>
        <Box bg='gray.100' height='16'>
        </Box>
        <Box bg='gray.100' height='16'>
        </Box>
    </SimpleGrid>
  );
}
