import React, { useContext, useState } from "react";
import { Box, CardBody, CardFooter,  Text, SimpleGrid, Card, CardHeader, Heading, Flex, InputGroup, Input, InputRightElement, IconButton, Button, useColorModeValue } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { TbLetterK, TbLetterJ, TbLetterC } from "react-icons/tb";
import axios from 'axios';
import WordContext from "./WordContext";
import { LAN, LanType } from "./Lan";


export function MainCom() {
    const [query, setQuery] = useState('');
    const context = useContext(WordContext);

    if (!context) {
        throw new Error("MainCom must be used within a WordProvider");
    }

    const { selectedIcon, setSelectedIcon, setSearchResults, wordRange, setWordRange } = context;

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search?query=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };


    const iconColor = useColorModeValue("white", "gray.700");
    const lanColor = useColorModeValue("teal.50", "blue.700");
    const letteColor = useColorModeValue("black", "white");
    const searchIconColor = useColorModeValue("gray.200", "gray.600");

    return (
      <Box>
        <Box 
            overflow="hidden" 
            m="0 auto" 
            w="90%" 
            mt={10}
            mb={5}
        >
            <Box w="100%" display="flex" justifyContent="center" p={1} pt={4}>
                <InputGroup w="100%" bg={iconColor}>
                <Input 
                    placeholder="Search..." 
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                        if (e.target.value === '') {
                            setSearchResults([]); 
                        }
                    }}
                    onKeyPress={e => e.key === 'Enter' && handleSearch()}
                />
                    <InputRightElement>
                        <IconButton 
                            aria-label="Search" 
                            icon={<FaSearch />} 
                            bg= {searchIconColor}
                            onClick={handleSearch}
                        />
                    </InputRightElement>
                </InputGroup>
              </Box>
          </Box>
          <Box 
              overflow="hidden" 
              m="0 auto"  
              w="90%"  
              mt={5}
              mb={1}
              textAlign="center"
          >
          </Box>
          <SimpleGrid spacing={3} templateColumns='repeat(minmax(500px, 1fr))'>

            <Box m={6}>

            </Box>
            <Card m={0}>
            <CardHeader>
                <Flex align="center" justify="space-between"> 
                    <Heading size='lg' ml={1}> 1 </Heading>
                
                    <Box display="flex" justifyContent="space-between">
                        <Flex>
                            <IconButton
                                size="sm"
                                aria-label="Icon K"
                                icon={<TbLetterK />}
                                variant={"outline"}
                                m={1}
                                bg={selectedIcon === LAN.K ? lanColor : iconColor}
                                color={selectedIcon === LAN.K ? letteColor : undefined}
                                onClick={() => setSelectedIcon(LAN.K)}

                                _hover={{ bg: lanColor }}
                            />
                            <IconButton
                                size="sm"
                                aria-label="Icon J"
                                icon={<TbLetterJ />}
                                variant={"outline"}
                                m={1}
                                bg={selectedIcon === LAN.J ? lanColor : iconColor}
                                color={selectedIcon === LAN.J ? letteColor : undefined}
                                onClick={() => setSelectedIcon(LAN.J)}

                                _hover={{ bg: lanColor }}
                            />
                            <IconButton
                                size="sm"
                                aria-label="Icon C"
                                icon={<TbLetterC />}
                                variant={"outline"}
                                m={1}
                                bg={selectedIcon === LAN.C ? lanColor : iconColor}
                                color={selectedIcon === LAN.C ? letteColor : undefined}
                                onClick={() => setSelectedIcon(LAN.C)}

                                _hover={{ bg: lanColor }}
                            />
                        </Flex>
                    </Box>
                </Flex> 
            </CardHeader>
            <CardBody ml={1}>
                <Text> 2 </Text>
            </CardBody>
            <CardFooter ml={1}>
            </CardFooter>
            </Card>
        
        </SimpleGrid>
      </Box>
    );
}
