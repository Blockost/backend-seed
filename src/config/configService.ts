import { injectable, inject } from 'inversify';
import { join } from 'path';
import convict from 'convict';
import dotenv from 'dotenv';
import SERVICE_IDENTIFIERS from './inversify/serviceIdentifiers';
import LoggerService from '../services/loggerService';
import IOrmConfiguration from './ormConfiguration';

/**
 * Injectable service that holds app configuration.
 */
@injectable()
export default class ConfigService {
  private readonly config!: convict.Config<any>;

  constructor(
    @inject(SERVICE_IDENTIFIERS.LoggerService) private readonly loggerService: LoggerService
  ) {
    // Load environment variable with dotenv
    dotenv.config({ path: join(__dirname, 'environments/.env') });

    // Define convict schema
    const schema = convict({
      environment: {
        doc: 'Current environment',
        format: ['dev', 'prod'],
        default: null,
        env: 'NODE_ENV'
      },
      ormconfig: {
        host: {
          doc: 'Host address where the database server is installed on',
          format: 'ipaddress',
          default: null
        },
        port: {
          doc: 'Database port',
          format: 'port',
          default: null
        },
        username: {
          doc: 'Database user',
          format: String,
          default: null
        },
        password: {
          doc: 'Database user password',
          format: String,
          default: null
        },
        database: {
          doc: 'Name of the database to use',
          format: String,
          default: null
        },
        schema: {
          doc: 'Name of the schema to use',
          format: String,
          default: null
        },
        synchronize: {
          doc: 'Whether entities should be synced when app starts',
          format: Boolean,
          default: true
        },
        logging: {
          doc: 'Enable logging of all queries and erros',
          format: Boolean,
          default: false
        },
        entities: {
          doc: 'Path to js files representing DB entities',
          format: Array,
          default: [__dirname + '/../models/**/*.js']
        },
        migrations: {
          doc: 'Path to js migration scripts',
          format: Array,
          default: [__dirname + '/../migration/**/*.js']
        },
        subscribers: {
          doc: '',
          format: Array,
          default: [__dirname + '/../subscriber/**/*.js']
        }
      }
    });

    // Load environment-specific config file
    const configFile = `config.${process.env.NODE_ENV}.json`;
    this.loggerService.info(`Using ${configFile} as default configuration file`);
    this.config = schema.loadFile(join(__dirname, `environments/${configFile}`));

    // Validate loaded config against defined schema
    schema.validate({ allowed: 'strict' });
    this.loggerService.info(`Effective configuration: ${this.config}`);
  }

  getOrmConfig(): IOrmConfiguration {
    return {
      host: this.config.get('ormconfig.host'),
      port: this.config.get('ormconfig.port'),
      username: this.config.get('ormconfig.username'),
      password: this.config.get('ormconfig.password'),
      database: this.config.get('ormconfig.database'),
      schema: this.config.get('ormconfig.schema'),
      synchronize: this.config.get('ormconfig.synchronize'),
      logging: this.config.get('ormconfig.logging'),
      entities: this.config.get('ormconfig.entities'),
      migrations: this.config.get('ormconfig.migrations'),
      subscribers: this.config.get('ormconfig.subscribers')
    };
  }
}
