import hashjs from 'hash.js'

export const hash = string => hashjs.sha256().update(string + hashjs.sha256().update(string).digest('hex')).digest('hex')
