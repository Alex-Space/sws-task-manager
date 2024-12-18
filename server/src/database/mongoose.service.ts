import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.service.interface';
import { TYPES } from '../types';

@injectable()
export class MongooseService {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	async connect(uri: string): Promise<void> {
		try {
			await mongoose.connect(uri);
			this.logger.log('[MongooseService]✅ Successfully connected to MongoDB');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[MongooseService]❌ Connection to MongoDB failed: ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await mongoose.disconnect();
		this.logger.log('[MongooseService] Отключение от базы данных выполнено');
	}
}
