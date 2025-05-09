/**
 * Logger utility - Cung cấp hàm tiện ích để log có thể tùy chỉnh và tắt/bật dựa vào environment
 */

// Cấu hình logger
const config = {
  // Bật/tắt tất cả các log, có thể đọc từ env variable
  enabled: true,
  // Bật/tắt các loại log cụ thể
  levels: {
    debug: true,
    info: true,
    warn: true,
    error: true,
  },
  // Bật/tắt log từ các module cụ thể
  modules: {
    api: true,
    auth: true,
    cart: true,
    route: true,
    ui: true,
    // Thêm module khác nếu cần
  }
};

// Format timestamp
const getTimestamp = () => {
  return new Date().toISOString().split('T')[1].split('.')[0];
};

// Các styles cho log
const styles = {
  debug: 'color: #6c757d',
  info: 'color: #0d6efd',
  warn: 'color: #fd7e14',
  error: 'color: #dc3545; font-weight: bold',
  api: 'color: #20c997',
  auth: 'color: #6610f2',
  cart: 'color: #d63384',
  route: 'color: #198754',
  ui: 'color: #0dcaf0',
};

/**
 * Core logging function
 * @param {string} level - Log level (debug, info, warn, error)
 * @param {string} module - Module name 
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
const log = (level, module, message, data = null) => {
  // Kiểm tra xem logger có được bật không
  if (!config.enabled || !config.levels[level] || !config.modules[module]) {
    return;
  }

  const timestamp = getTimestamp();
  const prefix = `[${timestamp}][${module.toUpperCase()}]`;
  
  if (data) {
    console[level === 'debug' ? 'log' : level](
      `%c${prefix} ${message}`, 
      styles[level], 
      data
    );
  } else {
    console[level === 'debug' ? 'log' : level](
      `%c${prefix} ${message}`, 
      styles[level]
    );
  }
};

// API exports
const logger = {
  // Dùng cho API calls
  api: {
    debug: (message, data) => log('debug', 'api', message, data),
    info: (message, data) => log('info', 'api', message, data),
    warn: (message, data) => log('warn', 'api', message, data),
    error: (message, data) => log('error', 'api', message, data),
  },
  
  // Dùng cho auth
  auth: {
    debug: (message, data) => log('debug', 'auth', message, data),
    info: (message, data) => log('info', 'auth', message, data),
    warn: (message, data) => log('warn', 'auth', message, data),
    error: (message, data) => log('error', 'auth', message, data),
  },
  
  // Dùng cho cart
  cart: {
    debug: (message, data) => log('debug', 'cart', message, data),
    info: (message, data) => log('info', 'cart', message, data),
    warn: (message, data) => log('warn', 'cart', message, data),
    error: (message, data) => log('error', 'cart', message, data),
  },
  
  // Dùng cho routing
  route: {
    debug: (message, data) => log('debug', 'route', message, data),
    info: (message, data) => log('info', 'route', message, data),
    warn: (message, data) => log('warn', 'route', message, data),
    error: (message, data) => log('error', 'route', message, data),
  },
  
  // Dùng cho UI components
  ui: {
    debug: (message, data) => log('debug', 'ui', message, data),
    info: (message, data) => log('info', 'ui', message, data),
    warn: (message, data) => log('warn', 'ui', message, data),
    error: (message, data) => log('error', 'ui', message, data),
  },
  
  // Enable/disable logger
  enable: () => {
    config.enabled = true;
    console.log('%c[LOGGER] Enabled', 'color: green');
  },
  
  disable: () => {
    config.enabled = false;
    console.log('%c[LOGGER] Disabled', 'color: red');
  },
  
  // Enable/disable specific level
  enableLevel: (level) => {
    if (config.levels.hasOwnProperty(level)) {
      config.levels[level] = true;
      console.log(`%c[LOGGER] Level ${level} enabled`, 'color: green');
    }
  },
  
  disableLevel: (level) => {
    if (config.levels.hasOwnProperty(level)) {
      config.levels[level] = false;
      console.log(`%c[LOGGER] Level ${level} disabled`, 'color: red');
    }
  },
  
  // Enable/disable specific module
  enableModule: (module) => {
    if (config.modules.hasOwnProperty(module)) {
      config.modules[module] = true;
      console.log(`%c[LOGGER] Module ${module} enabled`, 'color: green');
    }
  },
  
  disableModule: (module) => {
    if (config.modules.hasOwnProperty(module)) {
      config.modules[module] = false;
      console.log(`%c[LOGGER] Module ${module} disabled`, 'color: red');
    }
  },
};

// Tự động tắt logger trong production
if (process.env.NODE_ENV === 'production') {
  config.enabled = false;
}

export default logger; 