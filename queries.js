const Pool = require('pg').Pool

const pool = new Pool({
    user: 'jhlqfjaaffpmon',
    host: 'ec2-107-21-10-179.compute-1.amazonaws.com',
    password: 'b806f5faa19f01c57e4df5a25f87c0e2e26d900f44da776349cd51023ae192a3',
    database: 'doupcr6pemj88',
    port: '5432',
    ssl: true,
    dialect: 'postgres',
  dialectOptions: {
    "ssl": {"require":true }
  }
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
pool.connect();

async function getToken(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM token_user ORDER BY user_id ASC`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
  }

const getUsers = (request, response) => {
  pool.query('SELECT id, name, email FROM public.users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const createLlamada = (request, response) => {
  const { email_doc, email_user } = request.body

  pool.query('INSERT INTO users_room_llamada (email_doc, email_user) VALUES ($1, $2)', [email_doc, email_user], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`llamada added ok`)
  })
}

const getLlamadas = (request, response) => {
  pool.query('SELECT id, email_doc, email_user FROM users_room_llamada ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLLamadaByCorreo = (request, response) => {
  const email = (request.params.email)

  pool.query('SELECT * FROM users_room_llamada WHERE email_doc = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteLLamada = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users_room_llamada WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const deleteLLamadaByCorreo = (request, response) => {
  const email = (request.params.email)
  console.log(email);
  pool.query('DELETE FROM users_room_llamada WHERE email_doc = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${email}`)
  })
}

module.exports = {
    createLlamada,
    getLlamadas,
    deleteLLamada,
    deleteLLamadaByCorreo,
    getLLamadaByCorreo,

    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getToken,
}
  

