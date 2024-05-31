
import { Box, useColorModeValue, Flex, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';



interface IWord {
  numbering: string 
  word: string
}

export default function Word({ numbering, word }: IWord) {
  const borderColorOne = useColorModeValue("gray.200", "gray.800");
  const bgColor = useColorModeValue("white", "gray.700");
  const borderBottomColor = useColorModeValue("gray.300", "gray.600");
  return (
    <Box 
      border="1px" 
      borderColor={borderColorOne}
      borderRadius="md" 
      overflow="hidden" 
      m="0 auto"  // 가운데 정렬
      w="90%"  // 너비를 90%로 설정
      bg={bgColor}
    >
      <Flex
        borderBottom="1px"
        borderBottomColor={borderBottomColor}
        justifyContent="space-between"
        p={4}
      >
        <Box textAlign="center" w="30%">
          <Text fontSize="xl">
            {numbering}
          </Text>
        </Box>
        <Box textAlign="center" w="70%">
          <Link to={`/${numbering}`}>
            <Text fontSize="xl">{word}</Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
