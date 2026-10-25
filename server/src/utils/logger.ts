import { env } from '../config/env.js'

type Level = 'debug' | 'info' | 'warn' | 'error'

const levelWeight: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

function shouldLog(level: Level) {
  return levelWeight[level] >= levelWeight[env.LOG_LEVEL]
}

function write(level: Level, message: string, context: Record<string, unknown> = {}) {
  if (!shouldLog(level)) return

  if (env.isProduction) {
    console[level === 'debug' ? 'log' : level](
      JSON.stringify({
        level,
        message,
        time: new Date().toISOString(),
        ...context,
      }),
    )
    return
  }

  const contextSuffix =
    Object.keys(context).length > 0 ? ` ${JSON.stringify(context)}` : ''
  console[level === 'debug' ? 'log' : level](`[${level}] ${message}${contextSuffix}`)
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => write('debug', message, context),
  info: (message: string, context?: Record<string, unknown>) => write('info', message, context),
  warn: (message: string, context?: Record<string, unknown>) => write('warn', message, context),
  error: (message: string, context?: Record<string, unknown>) => write('error', message, context),
}
