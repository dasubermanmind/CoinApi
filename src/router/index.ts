import financeRouter from './financeRouter';
import primaryRouter from './primaryRouter';
import userRouter from './userRouter';

export { financeRouter, primaryRouter };

export default {
  finance: financeRouter,
  primary: primaryRouter,
  user: userRouter
};
