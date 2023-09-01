import { SimpleGrid, Flex, Box, Skeleton } from "@chakra-ui/react";
import Word from "../components/Word";
import { useEffect, useState } from "react";
import KrSkeleton from "../components/Krskeleton";

export default function Kr() {
    const [isLoading, setIsLoading] = useState(true)
    const [words, setWords] = useState([]);
    const fetchWords = async() => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/kr");
        const json = await response.json();
        setWords(json)
        setIsLoading(false)
    }
    useEffect(() => {
        fetchWords();
    }, []);

    return (
        <SimpleGrid>
            {isLoading ? (
            <>
                <KrSkeleton />
                <KrSkeleton />
                <KrSkeleton />
                <KrSkeleton />

            </>
            ) : null}
            {words.map(word => <Word />)}
        

        </SimpleGrid>
  );
}