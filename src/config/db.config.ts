import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class DBConfig {
  @Value('POSTGRES_DB')
  dbName: string;
  @Value('POSTGRES_USER')
  dbUser: string;
  @Value('POSTGRES_PASSWORD')
  dbPassword: string;
}
