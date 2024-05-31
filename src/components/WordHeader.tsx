import React, { useContext, useState }  from "react";
import { Box, Menu, MenuButton, Text, Link, MenuItem, MenuList, Heading, Flex, InputGroup, Input, InputRightElement, IconButton, Button, useColorModeValue, Center } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { TbLetterK, TbLetterJ, TbLetterC } from "react-icons/tb";
import { AiOutlineDown } from "react-icons/ai";
import axios from 'axios';
import WordContext from "./WordContext";
import { LAN, LanType } from "./Lan";



export default function WordHeader() {
    const [searched, setSearched] = useState(false);
    const [showNoResults, setShowNoResults] = useState(false);
    const [query, setQuery] = useState('');

    const context = useContext(WordContext);

    if (!context) {
        throw new Error("WordHeader must be used within a WordProvider");
    }

    const { selectedIcon, setSelectedIcon, searchResults, setSearchResults, wordRange, setWordRange } = context;



    const handleSearch = async () => {
        try {
            setSearched(true);
            setShowNoResults(false);  // 검색 시작 시 결과 없음 메시지 숨기기
            
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search?query=${query}`);
            setSearchResults(response.data);
    
            if (response.data.length === 0) { 
                // 검색 결과가 없으면 1초 후에 결과 없음 메시지 표시
                setTimeout(() => {
                    setShowNoResults(true);
                }, 100);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    
    

    const handleWordRangeChange = (start: number, end: number) => {
        setWordRange([start, end]);
        // 다른 로직 (예: 단어 목록을 다시 가져옴)이 필요하면 여기에 추가
    };

    const [selectedRange, setSelectedRange] = useState("1-100");

    const MenuItemWrapper = ({ range, start, end }: { range: string, start: number, end: number }) => {
        const isSelected = selectedRange === range;
        const bgColor = isSelected ? searchIconColor : undefined;
    
        return (
            <MenuItem 
                bg={bgColor}
                _focus={{ bg: bgColor }}
                _active={{ bg: bgColor }}
                onClick={() => { handleWordRangeChange(start, end); setSelectedRange(range); }}
            >
                {range}
            </MenuItem>
        );
    }


    const iconColor = useColorModeValue("white", "gray.700");
    const lanColor = useColorModeValue("teal.100", "blue.600");
    const letteColor = useColorModeValue("black", "white");
    const searchIconColor = useColorModeValue("gray.200", "gray.600");
    const headingTextColor = useColorModeValue("gray.700", "gray.200");

    return (
      <>
        <Box 
            overflow="hidden" 
            m="0 auto"  // 가운데 정렬
            w="90%"  // 너비를 90%로 설정
            mt={10}
            mb={5}
        >
            <Box>
            <Box textAlign="center" m={10} mb={6}>
                    <Heading fontSize="2xl" color={headingTextColor}>
                        {selectedIcon === LAN.K ? '한중일 공통 어휘집' :
                        selectedIcon === LAN.J ? '日中韓共通語彙集' : 
                        selectedIcon === LAN.C ? '中日韩共用汉字词典' : '한국어'}
                    </Heading>
                </Box>
            </Box>
            <Box textAlign="center" mb={8}>
                <Heading fontSize="xl" color={headingTextColor}>
                    {selectedIcon === LAN.K ? '한국어' :
                    selectedIcon === LAN.J ? '日本語' : 
                    selectedIcon === LAN.C ? '汉语' : '한국어'}
                </Heading>
            </Box>
            <Box w="100%" display="flex" justifyContent="center" p={4} pt={8}>
                <InputGroup w="100%" bg={iconColor}>
                <Input 
                    placeholder="Search..." 
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                        if (e.target.value === '') {
                            setSearchResults([]);
                            setSearched(false);
                            setShowNoResults(false); // 검색어가 비어 있을 때 검색 결과를 초기화
                        }
                    }}
                    onKeyPress={e => e.key === 'Enter' && handleSearch()}
                />
                    <InputRightElement>
                        <IconButton 
                            aria-label="Search" 
                            icon={<FaSearch />} 
                            bg={searchIconColor}
                            onClick={handleSearch}
                        />
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Box pt={12}>
                {showNoResults && <Text color={headingTextColor} mt={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    검색결과가 없습니다.
                </Text>}
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
            <Box textAlign="center" m={6}>

            </Box>

              <Box display="flex" justifyContent="space-between">
                <Flex ml={2}>
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
                <Box mr={2}>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<AiOutlineDown />} >
                            {selectedRange}
                        </MenuButton>
                        <MenuList textAlign={"center"}  >
                            <MenuItemWrapper range="1-100" start={0} end={100}/>
                            <MenuItemWrapper range="101-200" start={100} end={200} />
                            <MenuItemWrapper range="201-300" start={200} end={300} />
                            <MenuItemWrapper range="301-400" start={300} end={400} />
                            <MenuItemWrapper range="401-500" start={400} end={500} />
                            <MenuItemWrapper range="501-600" start={500} end={600} />
                        </MenuList>
                    </Menu>
                </Box>
            </Box>
          </Box>
      </>
    );
  }

  