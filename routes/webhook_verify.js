const processPostback = require('../processes/postback')
const processesMessage = require('../processes/messages')

module.exports = () => {
    app.get('/webhook', (req, res) =>{
        if(req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
            console.log('webhook verified')
            res.status(200).send(req.query['hub.challenge'])
        }else {
            console.error('verification failed. Token mismatch')
            res.sendStatus(403);
        }
    })

    app.post('/webhook', () =>{
        if(req.body.object === 'page'){
    
            req.body.entry.forEach((entry)=>{
                entry.messaging.forEach((event)=>{
                    console.log(event);
                    if(event.postback){
                        processPostback(event);
                    }
                    else if(event.message){
                        processesMessage(event)
                    }
                })
            })
    
            res.sendStatus(200)
        }
    })
}


