module.exports = {
  webpack: (config, { dev }) => {
    const entry = config.entry;

    config.entry = () => entry().then(result => {
        result['main.js'].splice(0, 0, 'babel-polyfill');
        return result;
    });

    return config;
  }
}