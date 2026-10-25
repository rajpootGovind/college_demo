import type { Request, Response } from 'express'
import { isDatabaseConnected } from '../config/database.js'
import { env } from '../config/env.js'

export function getHealth(_req: Request, res: Response) {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      database: isDatabaseConnected() ? 'connected' : 'memory',
      crm: env.CRM_MODE === 'live' ? 'live' : 'disabled',
      demoMode: env.DEMO_MODE,
      institutionId: env.INSTITUTION_ID,
      timestamp: new Date().toISOString(),
    },
  })
}
