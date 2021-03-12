import financeRouter from './financeRouter';
import primaryRouter from './primaryRouter';
import userRouter from '@/router/userRouter';

export { financeRouter, primaryRouter };

export default {
  finance: financeRouter,
  primary: primaryRouter,
  user: userRouter
};
