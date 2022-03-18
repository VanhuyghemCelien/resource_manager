module.exports = function (env) {
  const csp = {
    delivery: ['header'],
    enabled: true,
    failTests: true,
    policy: {
      'default-src': ["'none'"],
      'script-src': ["'self'"],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'connect-src': ["'self'"],
      'img-src': ["'self'"],
      'style-src': ["'self'", 'https://fonts.googleapis.com'],
      'media-src': ["'self'"],
      'style-src-elem': ["'self'", 'https://fonts.googleapis.com'],
      'style-src-attr': ["'self'", "'unsafe-inline'"],
    },
    reportOnly: true,
  };

  csp.policy['img-src'].push('https://tailwindui.com');

  if (env === 'development') {
    csp.policy['connect-src'].push('http://localhost:8000');
    csp.policy['script-src'].push("'unsafe-eval'");
  }

  if (env === 'test') {
    csp.policy['connect-src'].push("'http://localhost:8080'");
    csp.policy['script-src'].push("'unsafe-eval'");
  }

  if (env === 'production') {
    csp.policy['connect-src'].push("'https://production'");
  }

  return csp;
};
