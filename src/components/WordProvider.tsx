
import React, { useState, ReactNode } from 'react';
import WordContext, { WordContextType } from './WordContext';
import { WordData } from './type'; 
import { LAN, LanType } from "./Lan";


interface WordProviderProps {
    children: ReactNode;
}


export default function WordProvider({ children }: WordProviderProps) {
    const [selectedIcon, setSelectedIcon] = useState<LanType | null>(LAN.K);  // 상수를 사용하여 초기값 설정
    const [searchResults, setSearchResults] = useState<WordData[]>([]);
    const [wordRange, setWordRange] = useState<[number, number]>([0, 100]);

    return (
        <WordContext.Provider value={{ selectedIcon, setSelectedIcon, searchResults, setSearchResults, wordRange, setWordRange }}>
            {children}
        </WordContext.Provider>
    );
}