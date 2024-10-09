import pino from 'pino';
import pinoPretty from 'pino-pretty';

const isProduction = process.env.TYPE_ENV === 'production';

// Configuración del logger
const config = {
    level: isProduction ? 'silent' : 'debug',
    prettifier: pinoPretty,
};

// Crear una instancia de logger
const logger = pino(config, pinoPretty());

export default logger;