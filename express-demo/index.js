const express = require('express');
const { randomUUID } = require('node:crypto')
const app = express()
const port = 3000

app.use(express.json())

// Todot ovat muistissa ja katoavat, kun palvelin käynnistetään uudelleen.
const todos = []

function validateTodo(body, partial = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Lähetä todo JSON-oliona.'
  }

  if ((!partial || body.nimi !== undefined) &&
      (typeof body.nimi !== 'string' || body.nimi.trim() === '')) {
    return 'Nimi on pakollinen, eikä se saa olla tyhjä.'
  }
  if (body.kuvaus !== undefined && typeof body.kuvaus !== 'string') {
    return 'Kuvauksen pitää olla merkkijono.'
  }
  if (body.done !== undefined && typeof body.done !== 'boolean') {
    return 'Done-arvon pitää olla true tai false.'
  }
  if (body.deadline !== undefined && body.deadline !== null &&
      (typeof body.deadline !== 'string' || Number.isNaN(Date.parse(body.deadline)))) {
    return 'Deadlinen pitää olla päivämäärämerkkijono tai null.'
  }
}

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
    console.log(req.body);
    //res.send('todos post')
    const error = validateTodo(req.body)
    if (error) return res.status(400).json({ error })

    const todo = {
        id: randomUUID(),
        nimi: req.body.nimi.trim(),
        kuvaus: req.body.kuvaus ?? '',
        done: req.body.done ?? false,
        deadline: req.body.deadline ?? null
    }
    todos.push(todo)
    res.status(201).location(`/todos/${todo.id}`).json(todo)
})

// Haetaan yksittäinen todo ennen sen lukemista, muuttamista tai poistamista.
app.use('/todos/:id', (req, res, next) => {
  const todo = todos.find(todo => todo.id === req.params.id)
  if (!todo) return res.status(404).json({ error: 'Todoa ei löytynyt.' })
  req.todo = todo
  next()
})

app.get('/todos/:id', (req, res) => {
  res.json(req.todo)
})

app.put('/todos/:id', (req, res) => {
  const error = validateTodo(req.body)
  if (error) return res.status(400).json({ error })

  Object.assign(req.todo, {
    nimi: req.body.nimi.trim(),
    kuvaus: req.body.kuvaus ?? '',
    done: req.body.done ?? false,
    deadline: req.body.deadline ?? null
  })
  res.json(req.todo)
})

app.patch('/todos/:id', (req, res) => {
  const error = validateTodo(req.body, true)
  if (error) return res.status(400).json({ error })

  // Vain nämä kentät saa päivittää: palvelimen luoma id säilyy samana.
  for (const field of ['nimi', 'kuvaus', 'done', 'deadline']) {
    if (req.body[field] !== undefined) {
      req.todo[field] = field === 'nimi' ? req.body[field].trim() : req.body[field]
    }
  }
  res.json(req.todo)
})

app.delete('/todos/:id', (req, res) => {
  todos.splice(todos.indexOf(req.todo), 1)
  res.status(204).end()
})

app.get('/', (req, res) => {
  res.send('Hello Express World!')
})

app.get('/testi', (req, res) => {
    res.send('Terve testistä')
})

app.post('/posttesti', (req, res) => {
    res.send('Terve postista')
})

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Virheellinen JSON.' })
  }
  next(err)
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

module.exports = app
