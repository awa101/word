import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import WordDetailCom from "../components/WordDetailCom";

import { Box } from "@chakra-ui/react";


interface IWordK {
  word: string;
  hangeul: string;
  sound: string;
  numbering: string;
}

interface IWordJ {
  word: string;
  kana: string;
  sound: string;
  numbering: string;
}

interface IWordC {
  word: string;
  sound: string;
  numbering: string;
}

interface IMeaning {
  meaning: string;
  order: string;
  numbering: string;
}

export interface IWordMeaning {
  krword: IWordK;
  jpword: IWordJ;
  cnword: IWordC;
  krmeaning: IMeaning[];
  jpmeaning: IMeaning[];
  cnmeaning: IMeaning[];
}

interface IExampleItem {
  example: string;
  order: string;
  numbering: string;
}

export interface IExample {
  krexample: IExampleItem[];
  jpexample: IExampleItem[];
  cnexample: IExampleItem[];
}


type DetailData = IWordMeaning;

export default function WordDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState<IWordMeaning | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { numbering } = useParams<{numbering: string}>();
  const navigate = useNavigate();

  const [exampleData, setExampleData] = useState<IExample | null>(null);

  const fetchExampleData = async (meaningNumbering: string): Promise<IExample> => {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/${numbering}/ex/${meaningNumbering}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data: IExample = await response.json();
    return data;
  }

  useEffect(() => {
    const fetchWordDetail = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/${numbering}`);
        if (!response.ok) throw new Error("API call failed");
        const json = await response.json();
        setDetails(json);
      } catch (err) {
        console.error(err);
        // err 타입을 확인하고 처리
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An error occurred.");
        }
        navigate("/not-found");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchWordDetail();
  }, [numbering, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      overflow="hidden"
      m="0 auto"
      w="90%"
      mt={5}
      mb={1}
      textAlign="center"
    >
      <WordDetailCom detail={details!} fetchExampleData={fetchExampleData}/>
    </Box>
  );
}