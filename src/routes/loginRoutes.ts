import { NextFunction, Router } from 'express';
import { RequestWithBody } from '../models/requestWithBody';
import { Request, Response } from 'express';

function requireAuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (req?.session?.loggedIn) {
    next();
  } else {
    res.status(403);
    res.send('Not permitted');
  }
}

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
  if (email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/', (req, res) => {
  if (req?.session?.loggedIn) {
    res.send(`
    <div>
    <div> You are logged in</div>
    <a href="/logout">Logout</a>
    </div>
`);
  } else {
    res.send(`
    <div>
    <div> You are not logged in</div>
    <a href="/login">Login</a>
    </div>
    `);
  }
});

router.get('/logout', (req: RequestWithBody, res) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuthMiddleware, (req, res)=>{
res.send('Welcome to the protected route logged User')
})