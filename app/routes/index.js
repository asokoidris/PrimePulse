import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from '../config/logger.js';
import morgan from 'morgan';
import keys from '../config/keys.js';
import authRoute from './auth-route.js';
import categoryRoute from './category-route.js';
import aggregateRoute from './aggregate-route.js';
import companyRoute from './company-route.js';
import productRoute from './product-route.js';
import addressRoute from './address-route.js';
import bankRoute from './bank-route.js';
import favoriteRoute from './favourite-item-route.js';
import cartRoute from './cart-route.js';
import orderRoute from './order-route.js';
const app = express();

global.logger = Logger.createLogger({ label: 'PRIMEPULSE' });

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: logger.stream }));

app.get('/', (req, res) => {
  res.send('Hello PRIMEPULSE!');
});

app.use('/auth', authRoute);
app.use('/address', addressRoute);
app.use('/aggregate', aggregateRoute);
app.use('/bank', bankRoute);
app.use('/category', categoryRoute);
app.use('/company', companyRoute);
app.use('/favourite-item', favoriteRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);

export default app;
