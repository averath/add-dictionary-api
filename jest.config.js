module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^App/(.*)$': '<rootDir>/src/$1',
        '^database/(.*)$': '<rootDir>/src/database/$1',
        '^config/(.*)$': '<rootDir>/src/config/$1',
        '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^services/(.*)$': '<rootDir>/src/services/$1',
        '^middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
        '^routes/(.*)$': '<rootDir>/src/routes/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^public/(.*)$': '<rootDir>/src/public/$1',
        '^uploads/(.*)$': '<rootDir>/src/uploads/$1',
        '^schemas/(.*)$': '<rootDir>/src/schemas/$1',
    },
};
