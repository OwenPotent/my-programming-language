const keywords = [
    'if',
    'else',
    'while',
    'for',
    'return',
    'func',

    // the "dec" keyword is used for declarations
    'dec',
    'true',
    'false',
    'null',
    'undefined',
    'NaN',
    'Infinity',
    'this',
    'new',
    'in',
    'instanceof',
    'typeof',
    'void',
    'delete',
    'class',
    'extends',
    'super',
    'import',
    'from',
    'as',
    'export',
    'default',
    'let',
    'await',
    'with',
    'switch',
    'case',
    'break',
    'continue',
    'throw',
    'try',
    'catch',
    'finally',
    'do',
    'of',
]

class Token {
    constructor(type, value, line, column) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}

const codeExamples = [
    {
        code: `
            func main(int x, int y) :: int {
                dec z = x + y

                return z;
            }
        `,
        expected: [
            { type: 'FUNCTION', value: 'main', line: 1, column: 1 },
            { type: 'ARGUMENTS', value: [
                { type: 'TYPE', value: 'int', line: 1, column: 15 },
                { type: 'IDENTIFIER', value: 'x', line: 1, column: 18 },
                { type: 'TYPE', value: 'int', line: 1, column: 20 },
                { type: 'IDENTIFIER', value: 'y', line: 1, column: 22 },
            ], line: 1, column: 1 },
            { type: 'TYPE', value: 'int', line: 1, column: 25 },
            { type: 'BLOCK_STATEMENT', value: [
                { type: 'DECLARATION', value: [
                    { type: 'TYPE', value: 'int', line: 2, column: 5 },
                    { type: 'IDENTIFIER', value: 'z', line: 2, column: 8 },
                    { type: 'ASSIGNMENT', value: [
                        { type: 'IDENTIFIER', value: 'x', line: 2, column: 11 },
                        { type: 'OPERATOR', value: '+', line: 2, column: 12 },
                        { type: 'IDENTIFIER', value: 'y', line: 2, column: 14 },
                    ], line: 2, column: 11 },
                ], line: 2, column: 5 },
                { type: 'RETURN_STATEMENT', value: 'z', line: 3, column: 5 },
            ], line: 1, column: 28 },
        ]
    },
    {
        code: `
            dec int x = 1;
            dec bool z = true;
            dec float f = 1.0;
            dec double d = 1.0;
            dec string s = "hello";
            dec Array<int> a = [1, 2, 3];
            
            #- This is a comment, it will be ignored
        `,
        expected: [
            { type: 'DECLARATION', value: [
                { type: 'TYPE', value: 'int', line: 1, column: 1 },
                { type: 'IDENTIFIER', value: 'x', line: 1, column: 5 },
                { type: 'ASSIGNMENT', value: '1', line: 1, column: 8 },
            ], line: 1, column: 1 },
            { type: 'DECLARATION', value: [
                { type: 'TYPE', value: 'bool', line: 2, column: 1 },
                { type: 'IDENTIFIER', value: 'z', line: 2, column: 5 },
                { type: 'ASSIGNMENT', value: 'true', line: 2, column: 8 },
            ], line: 2, column: 1 },
            { type: 'DECLARATION', value: [
                { type: 'TYPE', value: 'float', line: 3, column: 1 },
                { type: 'IDENTIFIER', value: 'f', line: 3, column: 6 },
                { type: 'ASSIGNMENT', value: '1.0', line: 3, column: 9 },
            ], line: 3, column: 1 },
            { type: 'DECLARATION', value: [
                { type: 'TYPE', value: 'double', line: 4, column: 1 },
                { type: 'IDENTIFIER', value: 'd', line: 4, column: 7 },
                { type: 'ASSIGNMENT', value: '1.0', line: 4, column: 10 },
            ], line: 4, column: 1 },
            { type: 'DECLARATION', value: [
                { type: 'TYPE', value: 'string', line: 5, column: 1 },
                { type: 'IDENTIFIER', value: 's', line: 5, column: 6 },
                { type: 'ASSIGNMENT', value: '"hello"', line: 5, column: 9 },
            ], line: 5, column: 1 },
            { type: 'DECLARATION', value: [
                { type: 'TYPE', value: [
                    { type: 'TYPE', value: 'Array', line: 6, column: 1 },
                    { type: 'TYPE_ARGUMENTS', value: [
                        { type: 'TYPE', value: 'int', line: 6, column: 7 },
                ], line: 6, column: 1 },
            ], line: 6, column: 1 },
                { type: 'IDENTIFIER', value: 'a', line: 6, column: 11 },
                { type: 'ASSIGNMENT', value: [
                    { type: 'LITERAL', value: '[', line: 6, column: 14 },
                    { type: 'INTERGER', value: '1', line: 6, column: 15 },
                    { type: 'LITERAL', value: ',', line: 6, column: 16 },
                    { type: 'INTERGER', value: '2', line: 6, column: 17 },
                    { type: 'LITERAL', value: ',', line: 6, column: 18 },
                    { type: 'INTERGER', value: '3', line: 6, column: 19 },
                    { type: 'LITERAL', value: ']', line: 6, column: 20 },
                ], line: 6, column: 14 },
            ], line: 6, column: 1 },
        ]
    }
]

const types = [
    'int',
    'bool',
    'float',
    'double',
    'string',
    'Array',
]