const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
  
const config = getDefaultConfig(__dirname);

// Agregar configuración para caracteres especiales
config.transformer.minifierConfig = {
  keep_quoted: true,
  mangle: {
    keep_quoted: true,
  },
};

// Configuración adicional para resolver problemas de encoding
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
  
module.exports = withNativeWind(config, { input: './global.css' });