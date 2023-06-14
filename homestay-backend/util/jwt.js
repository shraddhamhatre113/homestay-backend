import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export const createToken = async (payload, secret) => {
    const asyncSign = promisify(jwt.sign);
    return await asyncSign(payload, secret, {expiresIn: '1d'})
}

export const verifyToken = async (token, secret) => {
    const asyncVerify = promisify(jwt.verify);
    return await asyncVerify(token, secret);
}