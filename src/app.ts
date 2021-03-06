import bodyparser from 'body-parser';
import cors from 'cors';
import InversifyConfig from './config/inversify/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';

// Import @controller here so that the classes are declared and the metadata are generated
import './controllers/userController';

const PORT = 3000;
const inversionOfControlContainer = new InversifyConfig();

// Synchronous bindings
inversionOfControlContainer.bind();

// XXX: 2019-11-22 Blockost Using an IIAFE (Immediately Invoked Async Function Expression) here because
// `await` is only usable inside an `async` function.
// The good news is top-level await should be coming soon: https://github.com/tc39/proposal-top-level-await
(async () => {
  try {
    // Asynchronous bindings
    await inversionOfControlContainer.bindAsync();

    // When asynchronous bindings are done, start the application with the finalized container
    const server = new InversifyExpressServer(inversionOfControlContainer.getContainer());
    server.setConfig((app) => {
      app.use(bodyparser.json());
      // Add CORS support, enable any origin (i.e Access-Control-Allow-Origin: *)
      app.use(cors());
    });

    // Build and start Express server
    const inversifyExpressApp = server.build();
    inversifyExpressApp.listen(PORT, () => console.log(`Listening in port ${PORT}`));
  } catch (error) {
    // XXX 2019-03-15 Blockost Logging to console because bindings failed so we don't
    // have access to LoggerService here
    console.error(`Cannot start application. Reason: ${error}`);
  }
})();
