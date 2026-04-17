import './load-env.js';

import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

async function bootstrap() {
	await connectDatabase();

	app.listen(env.port, () => {
		console.log(`server listening on http://localhost:${env.port}`);
	});
}

bootstrap().catch((error: unknown) => {
	console.error('failed to start server', error);
	process.exit(1);
});