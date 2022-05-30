/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        testTimeout: 30000,
        setupFiles: [],
        coverage: {
            reporter: ['text', 'html'],
        },
        globals: true,
    },
});
