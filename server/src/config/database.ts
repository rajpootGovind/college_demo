import mongoose from 'mongoose'
import { env } from './env.js'
import { logger } from '../utils/logger.js'

export async function connectDatabase(): Promise<boolean> {
  if (!env.MONGODB_URI) {
    logger.warn(
      'MONGODB_URI is not configured. Enquiries will be kept in memory for this session (demo mode).',
    )
    return false
  }

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8_000,
      autoIndex: !env.isProduction,
    })
    logger.info('MongoDB connected', { database: mongoose.connection.name })
    return true
  } catch (error) {
    logger.error('MongoDB connection failed', {
      message: error instanceof Error ? error.message : String(error),
    })
    // In production a persistence failure should be visible but should not take a
    // demonstration site offline; enquiries fall back to the in-memory store.
    return false
  }
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
}
