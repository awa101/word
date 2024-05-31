import { Box, SimpleGrid, Heading, Flex, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { IconButton } from "@chakra-ui/react";

import { TbLetterK, TbLetterJ, TbLetterC } from "react-icons/tb";

export default function TWord() {
  return (<SimpleGrid spacing={3} templateColumns='repeat(minmax(500px, 1fr))'>

  <Box m={6}>

  </Box>
  <Card m={5}>
    <CardHeader>
      <Flex align="center" justify="space-between"> 
          <Heading size='lg' ml={1}> 1 </Heading>
      
          <Flex>
            <IconButton aria-label="Icon K" icon={<TbLetterK />} variant={"outline"} m={1}/>
            <IconButton aria-label="Icon J" icon={<TbLetterJ />} variant={"outline"} m={1}/>
            <IconButton aria-label="Icon C" icon={<TbLetterC />} variant={"outline"} m={1}/>
          </Flex>
      </Flex> 
    </CardHeader>
    <CardBody ml={1}>
      <Text> 2 </Text>
    </CardBody>
    <CardFooter ml={1}>
    </CardFooter>
  </Card>

</SimpleGrid>

  );
}

