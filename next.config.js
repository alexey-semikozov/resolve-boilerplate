module.exports = {
  webpack: (config, { dev }) => {
    const entry = config.entry;

    config.entry = () => entry().then(result => {
        result['main.js'].splice(0, 0, 'regenerator-runtime/runtime');
        return result;
    });

    return config;
  }
}