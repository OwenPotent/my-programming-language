module.exports = class Lexer {
    constructor(code) {
        this.code = code;
        this.tokens = [];
        this.line = 1;
        this.column = 1;
        this.index = 0;
        this.current = null;
    }

    // This function will return the next token
    next() {
        // If we have already found a token, we return it
        if (this.current) {
            return this.current;
        }

        // If we have reached the end of the code, we return null
        if (this.index >= this.code.length) {
            return null;
        }

        // We get the current character
        const char = this.code[this.index];

        // We check if it is a whitespace using an adapted regex
        if (/\s/.test(char)) {
            // If it is, we skip it
            this.index++;
            this.column++;
            return this.next();
        }

        // We check if it is a comment using an adapted regex
        if (/\#-/.test(char)) {
            // If it is, we skip it
            while (this.index < this.code.length && this.code[this.index] !== '\n') {
                this.index++;
                this.column++;
            }
            return this.next();
        }

        // We check if it is a new line
        if (char === '\n') {
            // If it is, we increase the line and the column
            this.line++;
            this.column = 0;
            this.index++;
            return this.next();
        }

        // We check if it is a string
        if (char === '"') {
            // If it is, we create a new token
            const token = {
                type: 'STRING',
                value: '',
                line: this.line,
                column: this.column,
            };

            // We skip the first character
            this.index++;
            this.column++;

            // We loop until we find the end of the string
            while (this.index < this.code.length && this.code[this.index] !== '"') {
                // We get the current character
                const char = this.code[this.index];

                // We check if it is a new line
                if (char === '\n') {
                    // If it is, we increase the line and the column
                    this.line++;
                    this.column = 0;
                }

                // We add the character to the token
                token.value += char;

                // We skip the current character
                this.index++;
                this.column++;
            }

            // We skip the last character
            this.index++;
            this.column++;

            // We return the token
            return token;
        }

        // We check if it is a number
        if (/\d/.test(char)) {
            // If it is, we create a new token
            const token = {
                type: 'INTERGER',
                value: '',
                line: this.line,
                column: this.column,
            };

            // We loop until we find a non-number character
            while (this.index < this.code.length && /\d/.test(this.code[this.index])) {
                // We get the current character
                const char = this.code[this.index];

                // We add the character to the token
                token.value += char;

                // We skip the current character
                this.index++;
                this.column++;
            }

            // We return the token
            return token;
        }

        // We check if it is a keyword
        if (keywords.includes(char)) {
            // If it is, we create a new token
            const token = {
                type: 'KEYWORD',
                value: char,
                line: this.line,
                column: this.column,
            };

            // We skip the current character
            this.index++;
            this.column++;

            // We return the token
            return token;
        }

        // We check if it is a type
        if (types.includes(char)) {
            // If it is, we create a new token
            const token = {
                type: 'TYPE',
                value: char,
                line: this.line,
                column: this.column,
            };

            // We skip the current character
            this.index++;
            this.column++;

            // We return the token
            return token;
        }

        // We check if it is an identifier
        if (/[a-zA-Z_]/.test(char)) {
            // If it is, we create a new token
            const token = {
                type: 'IDENTIFIER',
                value: '',
                line: this.line,
                column: this.column,
            };

            // We loop until we find a non-identifier character
            while (this.index < this.code.length && /[a-zA-Z_]/.test(this.code[this.index])) {
                // We get the current character
                const char = this.code[this.index];

                // We add the character to the token
                token.value += char;

                // We skip the current character
                this.index++;
                this.column++;
            }

            // We return the token
            return token;
        }

        // We check if it is a literal using an adapted regex
        if (/[\[\]\(\),]/.test(char)) {
            // If it is, we create a new token
            const token = {
                type: 'LITERAL',
                value: char,
                line: this.line,
                column: this.column,
            };

            // We skip the current character
            this.index++;
            this.column++;

            // We return the token
            return token;
        }

        // We check if it is an operator using an adapted regex
        if (/[\+\-\*\/\%\&\|\^\!\=\>\<]/.test(char)) {
            // If it is, we create a new token
            const token = {
                type: 'OPERATOR',
                value: char,
                line: this.line,
                column: this.column,
            };

            // We skip the current character
            this.index++;
            this.column++;

            // We return the token
            return token;
        }

        // We check if it is a separator using an adapted regex
        if (/[\;\:\,\.]/.test(char)) {
            // If it is, we create a new token
            const token = {
                type: 'SEPARATOR',
                value: char,
                line: this.line,
                column: this.column,
            };

            // We skip the current character
            this.index++;
            this.column++;

            // We return the token
            return token;
        }

        this.index++;
        this.column++;
        return this.next();
    }
};