import home from './home.json';
import login from './login.json';
import subscriptions from './subscriptions.json';
import templates from './templates.json';
import createUser from './create-user.json';
import resetPassword from './reset-password.json';
import confirmUser from './confirm-user.json';

export const pages = {
  home,
  login,
  templates,
  'subscriptions': subscriptions,
  'create-user': createUser,
  'reset-password': resetPassword,
  'confirm-user': confirmUser,
};
