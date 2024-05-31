export interface IWordK {
    word: string;
    hangeul: string;
    sound: string;
    numbering: string;
}
  
export interface IWordJ {
    word: string;
    kana: string;
    sound: string;
    numbering: string;
}
  
export interface IWordC {
    word: string;
    sound: string;
    numbering: string;
}
  
export type WordData = IWordK | IWordJ | IWordC;
