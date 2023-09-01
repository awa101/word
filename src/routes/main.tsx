import { SimpleGrid, Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { FaSearch } from 'react-icons/fa';
import { TbLetterK, TbLetterJ, TbLetterC } from "react-icons/tb";
import { redirect } from "react-router-dom";

export default function Main() {
    return <SimpleGrid spacing={3} templateColumns='repeat(minmax(500px, 1fr))'>
    <Box m={6}>
        <InputGroup>
            <Input placeholder="Search..."/>
            <InputRightElement>
                <IconButton aria-label="Search" icon={<FaSearch /> } />
            </InputRightElement>
        </InputGroup>
    </Box> 
    <Box m={6}>

    </Box>
    <Card>
      <CardHeader>
        <Flex align="center" justify="space-between"> 
            <Heading size='lg'> 롤 </Heading>
            <Flex>
                <IconButton aria-label="Icon K" icon={<TbLetterK />} variant={"outline"} m={1}/>
                <IconButton aria-label="Icon J" icon={<TbLetterJ />} variant={"outline"} m={1}/>
                <IconButton aria-label="Icon C" icon={<TbLetterC />} variant={"outline"} m={1}/>
            </Flex>
        </Flex> 
      </CardHeader>
      <CardBody>
        <Text> 캘리포니아 </Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
 
  </SimpleGrid>
} 