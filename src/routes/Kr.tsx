import React, { useContext, useEffect, useState } from "react";
import WordHeader from "../components/WordHeader";
import Word from "../components/Word";
import { Box, SimpleGrid, Button, Flex, useColorModeValue  } from "@chakra-ui/react";
import WordContext from "../components/WordContext"; 
import SearchResults from "../components/SearchResults";
import { ChevronUpIcon } from '@chakra-ui/icons'
import { WordData } from "../components/type"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react'
import { LAN, LanType } from "../components/Lan";


export default function Kr() {
    const [isLoading, setIsLoading] = useState(true);
    const [words, setWords] = useState<WordData[]>([]);
    const [displayCount, setDisplayCount] = useState(20); // 처음에는 20개만 보여줌

    const context = useContext(WordContext);
    const iconColor = useColorModeValue("white", "gray.700");
    const lanColor = useColorModeValue("black", "white");
    const letteColor = useColorModeValue("gray.300", "gray.500");
    const bgColor = useColorModeValue("gray.50", "gray.800");


    const handleButtonClick = () => {
        window.scrollTo({
            top: 0, 
            behavior: "smooth" // 스크롤을 부드럽게 움직이게 함
        });
    };

    function getLocale(lang: LanType) {
        switch(lang) {
            case LAN.K: return 'ko';
            case LAN.J: return 'ja';
            case LAN.C: return 'zh';
            default: return 'en';
        }
    }
    
    
    const getTabLabel = (icon: LanType | null, type: string) => {
        if (type === 'frequency') {
            switch (icon) {
                case LAN.K: return '빈도순';
                case LAN.J: return '頻度順';
                case LAN.C: return '频率顺序';
                default: return '빈도순';
            }
        } else if (type === 'alphabetical') {
            switch (icon) {
                case LAN.K: return '가나다순';
                case LAN.J: return '五十音順';
                case LAN.C: return '拼音顺序';
                default: return '가나다순';
            }
        }
    }

    if (!context) {
        throw new Error('Kr must be used within a WordProvider');
    }

    // const { selectedIcon, setSelectedIcon, searchResults, wordRange } = useContext(WordContext);
    const { selectedIcon, setSelectedIcon, searchResults, wordRange } = context;


    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // 탭 변경 핸들러
    const handleTabChange = (index: number) => {
        setSelectedTabIndex(index);
    };

    // useEffect 내부에서 데이터를 가져온 후의 로직
    const fetchWords = async () => {
        const endpoint = selectedIcon === LAN.K ? "/api/v1/kr" : selectedIcon === LAN.J ? "/api/v1/jp" : "/api/v1/cn";
        const response = await fetch(`http://127.0.0.1:8000${endpoint}`);
        const json = await response.json();
        setWords(json);
        setIsLoading(false);
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.offsetHeight) return;
        setDisplayCount(prevCount => prevCount + 20); // 스크롤이 끝에 닿으면 20개 추가로 불러옵니다.
    }

    const allWords = searchResults && searchResults.length > 0 ? searchResults : words;

    let dataToDisplay: WordData[] = [];

    // 빈도순 탭이 선택된 경우
    if (selectedTabIndex === 0) {
        dataToDisplay = allWords.slice(wordRange[0], wordRange[1]);
    } 
    else if (selectedTabIndex === 1) {
        dataToDisplay = [...allWords]
            .sort((a: WordData, b: WordData) => {
                let wordA: string;
                let wordB: string;
                let langA: LanType;
                let langB: LanType;
            
                if ('hangeul' in a) {
                    wordA = a.hangeul;
                    langA = LAN.K; // KR
                } else if ('kana' in a) {
                    wordA = a.word;
                    langA = LAN.J; // JP
                } else {
                    wordA = a.word;
                    langA = LAN.C; // CN
                }
            
                if ('hangeul' in b) {
                    wordB = b.hangeul;
                    langB = LAN.K; // KR
                } else if ('kana' in b) {
                    wordB = b.word;
                    langB = LAN.J; // JP
                } else {
                    wordB = b.word;
                    langB = LAN.C; // CN
                }
            
                // 먼저 언어별로 정렬
                if (langA !== langB) {
                    return langA.localeCompare(langB);
                }
            
                // 같은 언어 내에서 가나다순으로 정렬
                return wordA.localeCompare(wordB, getLocale(langA));
            })
            .slice(wordRange[0], wordRange[1]);
    }
    

    useEffect(() => {
        fetchWords();
    }, [selectedIcon]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <SimpleGrid>
            <WordHeader />
            
            <Tabs isFitted variant='enclosed' onChange={handleTabChange}>
                <TabList ml={6} mr={6}>
                    <Tab bgColor={bgColor} _selected={{ color: lanColor }} textColor={letteColor}>
                        {getTabLabel(selectedIcon, 'frequency')}
                    </Tab>
                    <Tab bgColor={bgColor} _selected={{ color: lanColor }} textColor={letteColor}>
                        {getTabLabel(selectedIcon, 'alphabetical')}
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel mt={-2}>
                        {dataToDisplay.slice(0, displayCount).map((word: WordData) => {
                            let displayWord: string;
                            if ('hangeul' in word) {
                                displayWord = word.hangeul;
                            } else if ('kana' in word) {
                                displayWord = word.word;
                            } else {
                                displayWord = word.word;
                            }
                            return (
                                <Word key={word.numbering}
                                    numbering={word.numbering}
                                    word={displayWord} />
                            );
                        })}
                    </TabPanel>

                    <TabPanel>
                        {dataToDisplay.slice(0, displayCount).map((word: WordData) => {
                            let displayWord: string;
                            if ('hangeul' in word) {
                                displayWord = word.hangeul;
                            } else if ('kana' in word) {
                                displayWord = word.word;
                            } else {
                                displayWord = word.word;
                            }
                            return (
                                <Word key={word.numbering}
                                    numbering={word.numbering}
                                    word={displayWord} />
                            );
                        })}
                    </TabPanel>
                </TabPanels>
                </Tabs>

                {displayCount < dataToDisplay.length && <Box p={2}></Box>}
                <Flex 
                    bottom={0} 
                    right={0} 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <Box m={4}>
                        <Button 
                            rightIcon={<ChevronUpIcon />} 
                            colorScheme='teal' 
                            variant='outline' 
                            onClick={handleButtonClick}
                        >
                        Top
                        </Button>
                    </Box>
                </Flex>
        </SimpleGrid>

    );
}


