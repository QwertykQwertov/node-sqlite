const sqlite3 = require('sqlite3').verbose()
const dbName = 'payments.sqlite'
const db = new sqlite3.Database(dbName)

db.serialize(() => {
  const sql = `
    CREATE TABLE IF NOT EXISTS payments
    (id integer primary key, gid, gmail, payment_type, payment_date)
  `
  db.run(sql)
})

class Payment {
  static all(cb) {
    db.all('SELECT * FROM payments', cb)
  }

  static find(gid, cb) {
    db.get('SELECT * FROM payments WHERE gid = ?', gid, cb)
  }

  static addPayment(data, cb) {
    const sql = 'INSERT INTO payments(gid, gmail, payment_type, payment_date) VALUES (?,?,?,?)'
    db.run(sql, data.gid, data.gmail, data.payment_type, data.payment_date, cb)
  }

}

module.exports = db
module.exports.Payment = Payment