import { Logger, format, createLogger, transports } from 'winston';
import LokiTransport from 'winston-loki';

export default class BotLogger {
    private level: string;
    private serviceName: string;
    private host: string;
    
    private options: Record<string, any>;
    private logger: Logger;

    constructor (level = 'info', serviceName = 'default', host = 'http://127.0.0.1:3100') {
        this.options = {
            level,
            format: format.json(),
            defaultMeta: { service: serviceName },
            transports: [
                new LokiTransport({
                    host,
                    json: true,
                    labels: { job: 'BBSC-bot' },
                    batching: false
                })
            ]
        }
    }

    public start (): Logger {
        this.logger = createLogger(this.options);

        if (process.env.NODE_ENV !== 'production') {
                this.logger.add(new transports.Console({
                format: format.simple(),
            }));
        }

        return this.logger;
    }
}
