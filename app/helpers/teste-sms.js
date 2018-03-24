const SMS = require('./send-sms');
const mensagem = new SMS( { number : '11975694842' , message : 'Seu Orçamento Número 2009022 ficou pronto. Para aprová-lo, clique aqui https://fixmylead.herokuapp.com/order/2009022'});
mensagem.send()
.then(sucess => console.log(sucess))
.catch(err => console.log)