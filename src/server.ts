import express from 'express';
import morgan from 'morgan';
import { getUserSkill, addUserSkill, updateUserSkill, deleteUserSkill } from './skillController';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthcheck', (req, res) => {
  res.status(200);
  res.json({ message: 'server is live' });
});

// Routes
app.get('/skill', getUserSkill);
app.post('/skill', addUserSkill);
app.put('/skill', updateUserSkill);
app.delete('/skill', deleteUserSkill);
export default app;
