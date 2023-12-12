import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from '../config/logger';
import morgan from 'morgan';
import keys from '../config/keys';
import authRoute from './auth-route';
import categoryRoute from './category-route';
import aggregateRoute from './aggregate-route';
import companyRoute from './company-route';
import productRoute from './product-route';
import addressRoute from './address-route';
import bankRoute from './bank-route';
import favoriteRoute from './favourite-item-route';
import cartRoute from './cart-route';
import orderRoute from './order-route';
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
