import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default {
    // o ts-jest compila o typescript antes de rodar os testes
    preset: "ts-jest",

    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "json"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
        prefix: "<rootDir>/",
    }),
    // jest roda todos os testes em que ele encontrar com .spec.ts
    testRegex: ".*\\.spec\\.ts$",

    // diz como transformar arquivos antes de rodar o teste
    // para cada ts, compile usando ts-jest de forma isolada
    transform: {
        "^.+\\.(t|j)s$": ["ts-jest", { isolatedModules: true }],
    },

    // quais arquivos entram na cobertura do teste
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.d.ts",
        "!src/**/index.ts",
        "!src/**/*.dto.ts",
        "!src/**/*.schema.ts",
    ],
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: ["text-summary", "lcov"],
};
