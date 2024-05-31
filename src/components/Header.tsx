import React from 'react';

import { Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineRead, AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react'
import { Button, Input, useDisclosure, useColorMode, useColorModeValue} from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  
} from '@chakra-ui/react'




export default function Header() {
    const {colorMode, toggleColorMode} = useColorMode();
    const Icon = useColorModeValue(FaMoon, FaSun);
    const bgColor = useColorModeValue("white", "gray.700");

    return (
        <HStack  bgColor={bgColor} p={1} borderBottomWidth={1} justifyContent={"space-between"}>
            <HStack spacing={"2.5"}>
                {/* <DrawerMenu /> */}
                <Box ml={3}>
                  <Link to="">
                    <AiOutlineRead size={25}/>
                  </Link>
                </Box>
            </HStack>
            <HStack spacing={"2.5"}>
                <IconButton 
                    onClick={toggleColorMode}
                    variant={"ghost"} 
                    aria-label="Toggle drak mode" 
                    icon={<Icon />}
                />
            </HStack>
        </HStack>
    );
}

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('left')
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton icon={<AiOutlineMenu />} aria-label='Send email' ref={btnRef} colorScheme='line' variant='ghost' onClick={onOpen} size={"lg"} /> 
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
              <Box borderBottom="1px solid #A0AEC0" p={4} w="100%" textAlign="center">
                <Link to="today" onClick={onClose}>
                  <Text fontSize="xl">
                    Voca List
                  </Text>
                </Link>
              </Box>
              <Box borderBottom="1px solid #A0AEC0" p={4} w="100%" textAlign="center">
                <Text fontSize="xl" fontWeight="bold">
                  엥
                </Text>
              </Box>
              <Box borderBottom="1px solid #A0AEC0" p={4} w="100%" textAlign="center">
                <Text fontSize="xl" >
                  ㅇㅇ
                </Text>
              </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={0} onClick={onClose}>
              close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}