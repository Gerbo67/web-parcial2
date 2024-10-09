import sql from 'mssql';
import config from '../config/config';
import logger from "../utils/logger";

let pool: sql.ConnectionPool;

(async () => {
    try {
        // @ts-ignore
        pool = await sql.connect(config.dbMssql);
        logger.info("Conexión a la base de datos exitosa!");
    } catch (error) {
        logger.error(`Hubo un error al conectar a la base de datos!`);
        process.exit(1);
    }
})();

export { pool };