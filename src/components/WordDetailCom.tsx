import { Box, Heading,  IconButton, Accordion, AccordionItem,  AccordionButton,  AccordionPanel,  AccordionIcon,  Text,
    Flex,  SimpleGrid,  useColorModeValue } from '@chakra-ui/react'
  
  import { TbLetterK, TbLetterJ, TbLetterC } from "react-icons/tb";
  import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
  import { useContext, useState }  from "react";
  
  import { IWordMeaning, IExample } from "../routes/WordDetail";
  import WordContext from "../components/WordContext"; 
  import Flag from 'react-flagkit';
  
  import { LAN, LanType } from "./Lan";
  
  
  interface WordDetailComProps {
      detail: IWordMeaning;
      fetchExampleData: (meaningNumbering: string) => Promise<IExample>;
  }
  
  
    export default function WordDetailCom({ detail, fetchExampleData }: WordDetailComProps) {
      const bgColor = useColorModeValue("white", "gray.700");
      const hvColor = useColorModeValue("white", "gray.600");
      const exColor = useColorModeValue("gray.100", "gray.600");
      const iconColor = useColorModeValue("white", "gray.700");
  
      const lanColor = useColorModeValue("teal.100", "blue.600");
      const letteColor = useColorModeValue("black", "white");
  
      const [exampleData, setExampleData] = useState<IExample | null>(null);
  
      const handleAccordionButtonClick = async (meaningNumbering: string) => {
          const responseData = await fetchExampleData(meaningNumbering);
          setExampleData(responseData);
      }
      
  
  
      const context = useContext(WordContext);
      if (!context) {
          throw new Error("WordHeader must be used within a WordProvider");
      }
  
      const { selectedIcon, setSelectedIcon } = context; 
  
      return (
        <>
          <SimpleGrid m={3} mt={10} mb={16} spacing={3} templateColumns='repeat(3, 1fr)'>
          <Card bg={bgColor}>
              <CardHeader p={4} pb={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Flag country="KR" size={24} />
              </CardHeader>
              <CardBody p={2}>
                  <Heading size='md'> {detail.krword.word} </Heading>
              </CardBody>
              <CardFooter p={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box textAlign="center">
                      <Text fontSize="md" >
                          {detail.krword.hangeul}
                      </Text>
                      <Text fontSize="md" color="gray.500">
                          {detail.krword.sound}
                      </Text>
                  </Box>
              </CardFooter>
          </Card>
          <Card bg={bgColor}>
              <CardHeader p={4} pb={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Flag country="JP" size={24} />
              </CardHeader>
              <CardBody p={2} >
                  <Heading size='md'> {detail.jpword.word} </Heading>
              </CardBody>
              <CardFooter p={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box textAlign="center">
                      <Text fontSize="md" >
                          {detail.jpword.kana}
                      </Text>
                      <Text fontSize="md" color="gray.500">
                          {detail.jpword.sound}
                      </Text>
                  </Box>
              </CardFooter>
          </Card>
          <Card bg={bgColor}>
              <CardHeader p={4} pb={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Flag country="CN" size={22} />
              </CardHeader>
              <CardBody p={2}>
                  <Heading size='md'> {detail.cnword.word} </Heading>
              </CardBody>
              <CardFooter p={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box textAlign="center">
                      <Text fontSize="md" >
                          {detail.cnword.sound}
                      </Text>
                      <Text fontSize="md" color={bgColor}>
                          .
                      </Text>
                  </Box>
              </CardFooter>
          </Card>
          </SimpleGrid>
  
  
          
          <Box display="flex" justifyContent="space-between">
              <Flex>
                  <IconButton
                      size="sm"
                      aria-label="Icon K"
                      icon={<TbLetterK />}
                      variant={"outline"}
                      m={1}
                      bg={selectedIcon === LAN.K ? {lanColor} : iconColor}
                      color={selectedIcon === LAN.K ? {letteColor} : undefined}
                      onClick={() => setSelectedIcon(LAN.K)}
  
                      _hover={{ bg: lanColor }}
                  />
                  <IconButton
                      size="sm"
                      aria-label="Icon J"
                      icon={<TbLetterJ />}
                      variant={"outline"}
                      m={1}
                      bg={selectedIcon === LAN.J ? {lanColor} : iconColor}
                      color={selectedIcon === LAN.J ? {letteColor} : undefined}
                      onClick={() => setSelectedIcon(LAN.J)}
  
                      _hover={{ bg: lanColor }}
                  />
                  <IconButton
                      size="sm"
                      aria-label="Icon C"
                      icon={<TbLetterC />}
                      variant={"outline"}
                      m={1}
                      bg={selectedIcon === LAN.C ? {lanColor} : iconColor}
                      color={selectedIcon === LAN.C ? {letteColor} : undefined}
                      onClick={() => setSelectedIcon(LAN.C)}
  
                      _hover={{ bg: lanColor }}
                  />
              </Flex>
          </Box>
  
  
          <Accordion defaultIndex={[]} allowMultiple>
              {detail.krmeaning.map((meaning, index) => (
                  <AccordionItem key={meaning.numbering} mt={0} mb={4}>
                      <h2>
                          <AccordionButton 
                              bg={bgColor}
                              _hover={{ bg: {hvColor} }}
                              _expanded={{ bg: exColor }}
                              onClick={() => handleAccordionButtonClick(meaning.numbering)}
                          >
                              <Box as="div" flex='1' textAlign='left'>
                                  <Box p={1} m={0}>
                                      <Text>
                                          {selectedIcon === LAN.K && `${meaning.meaning}`}
                                          {selectedIcon === LAN.J && `${detail.jpmeaning[index].meaning}`}
                                          {selectedIcon === LAN.C && `${detail.cnmeaning[index].meaning}`}
                                      </Text>
                                  </Box>
                              </Box>
                              <AccordionIcon />
                          </AccordionButton>
                      </h2>
                      <AccordionPanel p={2}>
                          {exampleData?.krexample.map((krEx, index) => (
                              <Box 
                              borderRadius="md" 
                              overflow="hidden" 
                              m="0 auto"  
                              bg={bgColor}
                              mt={2}
                              
                              key={krEx.numbering}
                              >
                                  <Flex
                                      justifyContent="space-between"
                                      p={4}
                                  >
                                      <Box textAlign="center" w="10%">
                                          <Text fontSize="lg">{index + 1}</Text>
                                      </Box>
                                      <Box textAlign="left" w="86%">
                                          <Text mb={2} fontSize="md">ㆍ{krEx.example}</Text>
                                          <Text mb={2} fontSize="md">ㆍ{exampleData?.jpexample[index]?.example}</Text>
                                          <Text mb={2} fontSize="md">ㆍ{exampleData?.cnexample[index]?.example}</Text>
                                      </Box>
                                  </Flex>
                              </Box>
                          ))}
                      </AccordionPanel>
  
                  </AccordionItem>
              ))}
          </Accordion>
  
  
        </>
      );
    }