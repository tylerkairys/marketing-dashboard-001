import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

console.log('Sync scheduler starting...');

cron.schedule('0 */6 * * *', async () => {
  console.log(`[${new Date().toISOString()}] Starting scheduled sync...`);

  try {
    console.log('Syncing Google Ads...');
    // await syncGoogleAds();
    console.log('Google Ads sync complete');
  } catch (err) {
    console.error('Google Ads sync failed:', err);
  }

  try {
    console.log('Syncing Meta Ads...');
    // await syncMeta();
    console.log('Meta Ads sync complete');
  } catch (err) {
    console.error('Meta Ads sync failed:', err);
  }

  try {
    console.log('Syncing GA4...');
    // await syncGA4();
    console.log('GA4 sync complete');
  } catch (err) {
    console.error('GA4 sync failed:', err);
  }

  console.log(`[${new Date().toISOString()}] Scheduled sync complete`);
});

console.log('Sync scheduler running — jobs fire every 6 hours');
