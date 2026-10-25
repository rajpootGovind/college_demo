import { createApp } from './app.js'
import { connectDatabase, disconnectDatabase } from './config/database.js'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'

async function start() {
  const databaseConnected = await connectDatabase()
  const app = createApp()

  const server = app.listen(env.PORT, () => {
    logger.info('api.started', {
      port: env.PORT,
      environment: env.NODE_ENV,
      database: databaseConnected ? 'mongodb' : 'memory',
      crm: env.CRM_MODE,
      demoMode: env.DEMO_MODE,
      allowedOrigins: env.CORS_ORIGINS,
    })
  })

  async function shutdown(signal: string) {
    logger.info('api.shutting_down', { signal })
    server.close(async () => {
      await disconnectDatabase()
      logger.info('api.stopped')
      process.exit(0)
    })

    setTimeout(() => process.exit(1), 10_000).unref()
  }

  process.on('SIGTERM', () => void shutdown('SIGTERM'))
  process.on('SIGINT', () => void shutdown('SIGINT'))

  process.on('unhandledRejection', (reason) => {
    logger.error('process.unhandled_rejection', {
      reason: reason instanceof Error ? reason.message : String(reason),
    })
  })

  process.on('uncaughtException', (error) => {
    logger.error('process.uncaught_exception', { message: error.message })
    void shutdown('uncaughtException')
  })
}

start().catch((error) => {
  logger.error('api.failed_to_start', {
    message: error instanceof Error ? error.message : String(error),
  })
  process.exit(1)
})
