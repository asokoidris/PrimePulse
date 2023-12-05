const USER_TYPES = {
  CUSTOMER: 'Customer',
  MANUFACTURER: 'Manufacturer',
  AGENT: 'Agent',
  ADMIN: 'Admin',
};

const VERIFICATION_TYPE = {
  EMAIL_VERIFICATION: 'email-verification',
  SMS_VERIFICATION: 'sms-verification',
  PASSWORD_RESET: 'password-reset',
  EMAIL_CHANGE: 'email-change',
  SMS_CHANGE: 'sms-change',
};

// NOTE - we can also have different kind of admin types like super admin, order admin, user admin etc depending on the app specification😃
const ADMIN_TYPES = {
  SUPER_ADMIN: 'SuperAdmin',
  ADMIN: 'Admin',
};

const CATEGORY_OR_SUBCATEGORY_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DISABLED: 'Disabled',
};

const PRODUCT_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DISABLED: 'Disabled',
  DELETED: 'Deleted',
};

const COMPANY_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DISABLED: 'Disabled',
  DELETED: 'Deleted',
};

const ADDRESS_STATUS = {
  ACTIVE: 'Active',
  DISABLED: 'Disabled',
  DELETED: 'Deleted',
};

const BANK_STATUS = {
  ACTIVE: 'Active',
  DISABLED: 'Disabled',
  DELETED: 'Deleted',
  DEFAULT: 'Default',
};

const ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

const PAYMENT_METHOD = {
  TRANSFER: 'Transfer',
  DEBIT_CARD: 'Debit Card',
  CASH_ON_DELIVERY: 'Cash On Delivery',
  WALLET: 'Wallet',
};

const PAYMENT_STATUS = {
  PAID: 'Paid',
  UNPAID: 'Unpaid',
  PENDING: 'Pending',
  CANCELLED: 'Cancelled',
};

const NOTIFICATION_TYPE = {
  ORDER: 'Order',
  EMAIL: 'Email',
  SMS: 'SMS',
  PUSH: 'Push',
};

const errorResponseMessage = 'Oops! Something went wrong';

export {
  USER_TYPES,
  VERIFICATION_TYPE,
  ADMIN_TYPES,
  CATEGORY_OR_SUBCATEGORY_STATUS,
  PRODUCT_STATUS,
  COMPANY_STATUS,
  ADDRESS_STATUS,
  BANK_STATUS,
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  errorResponseMessage,
};
