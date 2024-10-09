import { pool } from '../database/database';
import logger from "../utils/logger";
import sql from "mssql";

class ProductRepository {
    public async getProducts(): Promise<any[]> {
        try {
            logger.info('Empezando consulta de productos');

            const result = await pool.request()
                .query('SELECT * FROM Productos PE INNER JOIN TipoCantidad TC on TC.idTipoCantidad = PE.idTipoCantidad');

            return result.recordset || [];
        } catch (e) {
            // @ts-ignore
            const error = new Error(`Error en la base de datos: ${e.message}`);
            error.name = 'DatabaseError';
            (error as any).originalError = e;
            throw error;
        }
    }
}

export default new ProductRepository();