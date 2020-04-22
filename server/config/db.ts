interface IdbConfig {
  servername: string;
  port: string;
  DATABASE: string;
}

const dbConfig: IdbConfig = {
  servername: 'localhost',
  port: '27017',
  DATABASE: 'webim',
};

const db = `mongodb://${dbConfig.servername}:${dbConfig.port}/${dbConfig.DATABASE}`;

export default db;
