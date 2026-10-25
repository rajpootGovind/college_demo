import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    env: {
      NODE_ENV: 'test',
      DEMO_MODE: 'true',
      CRM_MODE: 'disabled',
      INSTITUTION_ID: 'aurevia-school',
    },
  },
})
