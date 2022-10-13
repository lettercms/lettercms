import mongo  from '../mongoose';
import paymentSchema from './schema/payments';
import invoiceSchema from './schema/invoices';

export const Payment = mongo.models.BlogPayment || mongo.model('BlogPayment', paymentSchema);

export const Invoices = mongo.models.BlogInvoices || mongo.model('BlogInvoices', invoiceSchema);