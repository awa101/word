import React from 'react';

import { Box, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
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
} from '@chakra-ui/react'

export default function Header() {
    const {colorMode, toggleColorMode} = useColorMode();
    const Icon = useColorModeValue(FaMoon, FaSun);

    return (
        <HStack p={"1"} borderBottomWidth={1} justifyContent={"space-between"}>
            <HStack spacing={"2.5"}>
                <DrawerExample /> 
                <AiOutlineRead size={25}/>
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

function DrawerExample() {
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
          <DrawerHeader>banana</DrawerHeader>

          <DrawerBody>
            <Input placeholder='hungry...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              close
            </Button>
            <Button colorScheme='blue'>good</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}