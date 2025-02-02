const sqlite3 = require('sqlite3').verbose()
const dbName = 'users.sqlite'
const db = new sqlite3.Database(dbName)

db.serialize(() => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users
    (id integer primary key, gid, gmail, payment_type, payment_date, active, subscription_end_date)
  `
  db.run(sql)
})

class User {
  static all(cb) {
    db.all('SELECT * FROM users', cb)
  }

  static find(gid, cb) {
    db.get('SELECT * FROM users gid = ?', gid, cb)
  }

  static create(data, cb) {
    const sql = 'INSERT INTO users(gid, gmail, payment_type, payment_date, active, subscription_end_date) VALUES (?,?,?,?,?,?)'
    db.run(sql, data.gid, data.gmail, data.payment_type, data.payment_date, data.active, data.subscription_end_date, cb)
  }

  static delete(gid, cb) {
    if (!gid) return cb(new Error('Please provide an google id'))
    db.run('DELETE FROM users WHERE id = ?', gid, cb)
  }

  static checkSubscribe(data, cb) {
    const sql = 'SELECT active FROM users WHERE gid=?'
    db.run(sql, data.gid, cb)
  }

  static addPayment() {
    // Добавить проверку на существование пользователя
    const sql = 'UPDATE users SET payment_type=?, payment_date=?, active=1, subscription_end_date=? WHERE gid=?'
    db.run(sql, data.payment_type, data.payment_date, data.subscription_end_date, data.gid, cb)
  }

  static checkEndDateSubscribe() {

  }
}

module.exports = db
module.exports.User = User