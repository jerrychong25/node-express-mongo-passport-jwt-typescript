import bcrypt from 'bcrypt-nodejs'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import passport from 'passport'
import '../auth/passportHandler'
import { User } from '../models/user'
import { JWT_SECRET } from '../util/secrets'

export class UserController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    await User.create({
      username: req.body.username,
      password: hashedPassword,
    })

    const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRET)
    res.status(200).send({ token: token })
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', function (err, user, info) {
      // no async/await because passport works only with callback ..
      if (err) return next(err)
      if (!user) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      } else {
        const token = jwt.sign({ username: user.username }, JWT_SECRET)
        res.status(200).send({ token: token })
      }
    })
  }
}
