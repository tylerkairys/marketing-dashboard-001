import { Router, Request, Response } from 'express';
import { query } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { product, days = 30 } = req.query;
    const result = await query(
      `SELECT * FROM metrics
       WHERE ($1::text IS NULL OR product_id = $1)
       AND fetched_at >= NOW() - INTERVAL '${Number(days)} days'
       ORDER BY fetched_at DESC`,
      [product || null]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

router.get('/summary', async (req: Request, res: Response) => {
  try {
    const { days = 30 } = req.query;
    const result = await query(
      `SELECT
         product_id,
         SUM(ad_spend)      AS total_spend,
         SUM(revenue)       AS total_revenue,
         SUM(conversions)   AS total_conversions,
         SUM(sessions)      AS total_sessions,
         ROUND(SUM(revenue) / NULLIF(SUM(ad_spend), 0), 2) AS roas
       FROM metrics
       WHERE fetched_at >= NOW() - INTERVAL '${Number(days)} days'
       GROUP BY product_id
       ORDER BY product_id`,
      []
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

export default router;
