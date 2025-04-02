export class VariableNameCase {
    private constructor(private readonly label: string) { }
    public static readonly CAMEL = new VariableNameCase("camel").label;
    public static readonly PASCAL = new VariableNameCase("pascal").label;
    public static readonly SNAKE = new VariableNameCase("snake").label;
    public static readonly KEBAB = new VariableNameCase("kebab").label;
    public static readonly UPPER = new VariableNameCase("upper").label;
}
