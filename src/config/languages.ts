export interface LanguageConfig {
  cmd: string;
  ext: string;
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  javascript: { cmd: "node temp.js", ext: ".js" },
  python: { cmd: "python3 temp.py", ext: ".py" },
  "c++": { cmd: "g++ temp.cpp -o temp && ./temp", ext: ".cpp" },
  java: { cmd: "javac Temp.java && java Temp", ext: ".java" },
};
