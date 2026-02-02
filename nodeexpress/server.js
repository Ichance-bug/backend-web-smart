const express = require('express'); 
const app = express() 
const PORT = 5005

// Middleware 
app.use(express.json())
app.use(express.static('public'))
app.use(require('cors')())
app.use(mw)

function mw(req, res, next) { 
    console.log('Go with the Middleware') 
    const {id} = req.query 
    console.log('ID:', id)
    if(id != 8) { 
      return res.sendStatus(403)
    }
    next()
}

// Tempo Database '
const db = []

//Scheduling 
function cron(ms, fn) { 
    async function cb(){ 
        clearTimeout(timeout)
        await fn() 
        // timeout = setTimeout(cb, ms)
    }
    let timeout = setTimeout(cb, ms) 
    return () => { }
}


function consoleDB() { 
    console.log('DB= ', db)
}

cron(1000, consoleDB)

http://172.0.0.1/

// GET POST PATCHED DELETE

//app.get('/', (req, res) => { 
  //  console.log('You have reach the home route: GET')
  //  res.status(200).send({"Message": 'Hello'})
//})

app.delete('/',(req, res) => { 
    console.log('You have reach the home route: Delete')
    res.sendStatus(200)
})

app.post('/api/info', (req, res) => { 
    const { information } = req.body 
    console.log('The Posted Messagge was:', information) 
    db.push(information) 
    console.log('DB: ', db)
    res.status(201).json({"yourMessage": information})

})

app.put('/api', (req, res) => { 
    const { word, corn } = req.query
     console.log(word, corn)
     res.sendStatus(200)

})

app.delete('/delete/java/rice', (req, res) => { 
    res.send('Didnt Make IT')
})

app.delete('/delete', mw, (req, res) => { 
    const { id } = req.params 
    console.log('What do you want to delete?', id)
    res.sendStatus(200)
})




app.listen(PORT, () => console.log(`Server has Started on Port: ${PORT}`)) 