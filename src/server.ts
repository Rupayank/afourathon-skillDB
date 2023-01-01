import express from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { requestValidate } from './middlewares/request-schema-validate';
// import { getUserSkill, updateUserSkill, deleteUserSkill } from './skillController';
import {validateRequest, errorHandler, NotFoundError, currentUser,requireAuth} from '@hackathonskilldb/common-middlewares'
import addUserSkill from './controller/add-user-skill';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);

app.get('/healthcheck', (req, res) => {
  res.status(200);
  res.json({ message: 'server is live' });
});

app.use(currentUser)

// Routes
// app.get('/skill', getUserSkill);
app.post('/skill',requireAuth,requestValidate,validateRequest, addUserSkill);
// app.put('/skill', requireAuth,updateUserSkill);
// app.delete('/skill', requireAuth,deleteUserSkill);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);


export default app;
