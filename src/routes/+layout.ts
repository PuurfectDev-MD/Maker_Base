
import injectAnalytics from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { dev } from '$app/environment';
injectSpeedInsights();
injectAnalytics.inject({ mode: dev ? 'development' : 'production' });

