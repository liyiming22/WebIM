interface IDBConfig {
  servername: string;
  port: string;
  DATABASE: string;
}

const dbConfig: IDBConfig = {
  servername: 'localhost',
  port: '27017',
  DATABASE: 'webim',
};

const DB_URL = `mongodb://${dbConfig.servername}:${dbConfig.port}/${dbConfig.DATABASE}`;

export default DB_URL;
