import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import orderRoute from './order.route'
import vehicleRoute from './vehicle.route';
import docsRoute from './docs.route';
import config from '../../config/config';
import sparesRoute from './spare.route'
import reportsRoute from './report.route'
import maintenanceRoute from './maintenance.route'
import contractRoute from './contract.route'
import circuitRoute from './circuit.route'
import citiestRoute from './city.route'
import subcircuitsRoute from './subcircuit.route'

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/subcircuits',
    route: subcircuitsRoute
  },
  {
    path: '/circuits',
    route: circuitRoute
  },
  {
    path: '/cities',
    route: citiestRoute
  },
  {
    path: '/maintenances',
    route: maintenanceRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/contracts',
    route: contractRoute
  },
  {
    path: '/orders',
    route: orderRoute
  },
  {
    path: '/vehicles',
    route: vehicleRoute
  },
  {
    path: '/spares',
    route: sparesRoute
  },
  {
    path: '/reports',
    route: reportsRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
