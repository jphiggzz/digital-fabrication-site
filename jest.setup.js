import '@testing-library/jest-dom';

jest.mock('@firebase/app', () => ({
    initializeApp: jest.fn().mockReturnValue({}),
}));

jest.mock('@firebase/auth', () => ({
    getAuth: jest.fn().mockReturnValue({}),
}));

jest.mock('@firebase/storage', () => ({
    getStorage: jest.fn().mockReturnValue({}),
    ref: jest.fn(),
}));
