export const LAN = {
    K: '가',
    J: 'あ',
    C: '中'
} as const; // "as const"를 사용하여 literal type을 유지합니다.

export type LanType = typeof LAN[keyof typeof LAN];

