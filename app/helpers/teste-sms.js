const SMS = require('./send-sms');
const mensagem = new SMS( { number : '11999014046' , message : 'Natalia o FixMyLead Informa que seu carro esta muito velhinho'});
mensagem.send()
.then(sucess => console.log(sucess))
.catch(err => console.log)