import { Router } from 'express';
import { RequestWithBody } from '../models/requestWithBody';

export const router = Router();

router.get('/login', (req, res) => {
  res.send(`
  <form method="POST">
  <div>
     <label>Email</label>
     <input name="email" />
  <div>
  <div>
      <label> Password </label>
      <input name="password" type="password"/>
  </div>
  <button> Submit </button>
  </form>
  `);
});

router.post('/login', (req: RequestWithBody, res) => {
  const { email, password } = req.body;
  if (email) {
    res.send(email.toUpperCase());
  } else {
    res.send('You must provide email');
  }
});
