import { VariableNameCase } from "./VariableNameCase";


export class FormatVariableName {
    private words: string[];

    private constructor(variableName: string) {
        const format = this.detectFormat(variableName);
        this.words = this.splitIntoWords(variableName, format);
    }

    private detectFormat(variableName: string): string {
        if (/^[a-z]+([A-Z][a-z0-9]*)*$/.test(variableName)) {
            return VariableNameCase.CAMEL;
        }
        if (/^[A-Z][a-z0-9]*([A-Z][a-z0-9]*)*$/.test(variableName)) {
            return VariableNameCase.PASCAL;
        }
        if (/^[a-z]+(_[a-z0-9]+)*$/.test(variableName)) {
            return VariableNameCase.SNAKE;
        }
        if (/^[a-z]+(-[a-z0-9]+)*$/.test(variableName)) {
            return VariableNameCase.KEBAB;
        }
        if (/^[A-Z]+(_[A-Z0-9]+)*$/.test(variableName)) {
            return VariableNameCase.UPPER;
        }
        throw new Error("Unknown variable name format");
    }

    private splitIntoWords(name: string, format: string): string[] {
        switch (format) {
            case VariableNameCase.CAMEL:
            case VariableNameCase.PASCAL:
                return name.split(/(?<=[a-z0-9])(?=[A-Z])/g);
            case VariableNameCase.SNAKE:
                return name.split("_").map((word) => word.toLowerCase());
            case VariableNameCase.KEBAB:
                return name.split("-").map((word) => word.toLowerCase());
            case VariableNameCase.UPPER:
                return name.split("_").map((word) => word.toLowerCase());
            default:
                throw new Error("Unsupported source format");
        }
    }

    public toCamel(): string {
        if (this.words.length === 0) return "";
        const [first, ...rest] = this.words;
        return (
            first.toLowerCase() +
            rest
                .map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join("")
        );
    }

    public toPascal(): string {
        return this.words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("");
    }

    public toSnake(): string {
        return this.words.join("_").toLowerCase();
    }

    public toKebab(): string {
        return this.words.join("-").toLowerCase();
    }

    public toUpper(): string {
        return this.words.map((word) => word.toUpperCase()).join("_");
    }

    public static from(variableName: string): FormatVariableName {
        return new FormatVariableName(variableName);
    }
}
