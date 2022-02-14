const Lexer = require("./Lexer")

module.exports = class Parser {
    constructor(code) {
        // We create the lexer
        this.lexer = new Lexer(code);
    }

    // We create the next function
    next() {
        // We get the current token
        const token = this.lexer.next();

        // We check if it is a keyword
        if (token.type === 'KEYWORD') {
            // If it is, we check if it is a keyword
            if (token.value === 'if') {
                // If it is, we create a new token
                const token = {
                    type: 'IF',
                    value: 'if',
                    line: this.lexer.line,
                    column: this.lexer.column,
                };

                // We return the token
                return token;
            }

            // If it is not, we create a new token
            const token = {
                type: 'KEYWORD',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We return the token
            return token;
        }

        // We check if it is a type
        if (token.type === 'TYPE') {
            // If it is, we create a new token
            const token = {
                type: 'TYPE',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We return the token
            return token;
        }

        // We check if it is an identifier
        if (token.type === 'IDENTIFIER') {
            // If it is, we create a new token
            const token = {
                type: 'IDENTIFIER',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We return the token
            return token;
        }

        // We check if it is a literal
        if (token.type === 'LITERAL') {
            // If it is, we create a new token
            const token = {
                type: 'LITERAL',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We return the token
            return token;
        }

        // We check if it is an operator
        if (token.type === 'OPERATOR') {
            // If it is, we create a new token
            const token = {
                type: 'OPERATOR',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We return the token
            return token;
        }

        // We check if it is a separator
        if (token.type === 'SEPARATOR') {
            // If it is, we create a new token
            const token = {
                type: 'SEPARATOR',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We return the token
            return token;
        }

        // We check if it is a comment and we skip it
        if (token.type === 'COMMENT') {
            // We skip the comment
            while (this.lexer.index < this.lexer.code.length && this.lexer.code[this.lexer.index] !== '\n') {
                // We skip the current character
                this.lexer.index++;
                this.lexer.column++;
            }

            // We return the next token
            return this.next();
        }

        // After all, we return the token
        return token;
    }

    // We create the parse function to parse the code and return the AST
    // When a token is made, it is pushed to the AST
    parse() {
        const ast = [
            {
                type: 'PROGRAM',
                body: [],
            }
        ];

        // We get the first token
        const token = this.next();

        // We check if it is a keyword
        if (token.type === 'KEYWORD') {
            // If it is, we check if it is a keyword
            if (token.value === 'if') {
                // If it is, we create a new token
                const token = {
                    type: 'IF',
                    value: 'if',
                    line: this.lexer.line,
                    column: this.lexer.column,
                };

                // We push the token to the AST
                ast[0].body.push(token);
            }
        }

        // We check if it is a type
        if (token.type === 'TYPE') {
            // If it is, we create a new token
            const token = {
                type: 'TYPE',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We push the token to the AST
            ast[0].body.push(token);
        }

        // We check if it is an identifier
        if (token.type === 'IDENTIFIER') {
            // If it is, we create a new token
            const token = {
                type: 'IDENTIFIER',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We push the token to the AST
            ast[0].body.push(token);
        }

        // We check if it is a literal
        if (token.type === 'LITERAL') {
            // If it is, we create a new token
            const token = {
                type: 'LITERAL',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We push the token to the AST
            ast[0].body.push(token);
        }

        // We check if it is an operator
        if (token.type === 'OPERATOR') {
            // If it is, we create a new token
            const token = {
                type: 'OPERATOR',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We push the token to the AST
            ast[0].body.push(token);
        }

        // We check if it is a separator
        if (token.type === 'SEPARATOR') {
            // If it is, we create a new token
            const token = {
                type: 'SEPARATOR',
                value: token.value,
                line: this.lexer.line,
                column: this.lexer.column,
            };

            // We push the token to the AST
            ast[0].body.push(token);
        }

        // We check if it is a comment and we skip it
        if (token.type === 'COMMENT') {
            // We skip the comment
            while (this.lexer.index < this.lexer.code.length && this.lexer.code[this.lexer.index] !== '\n') {
                // We skip the current character
                this.lexer.index++;
                this.lexer.column++;
            }

            // We return the next token
            return this.parse();
        }

        // After all, we return the AST
        return ast;
    }
}