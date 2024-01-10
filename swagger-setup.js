/**
 * Configurações para habilitar Swagger no projeto.
 */
const swaggerDefinition = {
    info: {
      title: "API REST de exemplo de uso do Swagger em Node.js",
      description: "Mostra como configurar uma aplicação Node.js com expressjs, swagger-ui-express para geração da Swagger UI e swagger-jsdoc para especificar os endpoints implementados com expressjs por meio de comentários JSDoc."
    },
    servers: ["https://job-portal-dy0q.onrender.com/"]
  }
  
  const swaggerJsDoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  
  const swaggerOptions = {
    swaggerDefinition,
    apis: ["./Routes/*.js"]
  };
  
  /**
   * Configura o Swagger UI para a aplicação expressjs.
   * @param {express} app Aplicação express
   */
  const setup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
  
  module.exports = setup;