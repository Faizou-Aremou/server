import { controller, get, use } from './decorators';
import { NextFunction, Request, Response } from 'express';

function requireAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req?.session?.loggedIn) {
    next();
  } else {
    res.status(403);
    res.send('Not permitted');
  }
}

@controller()
class RootController {
  @get()
  getRoot(req: Request, res: Response): void {
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
  }
  @get('protected')
  @use(requireAuthMiddleware)
  getProtected(req: Request, res: Response): void {
    res.send('Welcome to the protected route logged User');
  }
}
