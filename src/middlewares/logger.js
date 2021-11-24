const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  
  const logger = (req, res, next) => {
    const time = new Date().toLocaleDateString("de-DE", dateOptions);
    const method = req.method;
    const url = req.url;
    const body = req.body;
    const params = req.params;
  
    console.log(`\n\x1b[36m%s\x1b[0m`, time);
    console.log(`${method} ${url}\nRequest Body: ${JSON.stringify(body, null, 2)}`);
    console.log(`Params: ${JSON.stringify(params)}`);
  
    next();
  }
  
  exports.logger = logger;
  