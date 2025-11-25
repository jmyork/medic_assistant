// import User from "App/Models/auth/User";

// const nodemailer = require("nodemailer") // Adonis' mail
 
// export class   EmailHelper {


//     //Activar api menos seguro....
//     //https://myaccount.google.com/lesssecureapps

//     static enviarEmailContaCriada(user) {
//         //const user_find = await User.findByOrFail('email', username) 
//         // all emails are catched by ethereal.email
//         let transporter = nodemailer.createTransport({
//             //  host:  "smtp.gmail.com",
//             host: "mail3.gov.ao",
//             port: 465,
//             auth: {
//                 user: 'suporte@tecroval.gov.ao',
//                 pass: 'nhe4GXbdm3rlTIxc9yH'
//             }
//         });
//         transporter.sendMail({
//             user: 'tecroval@tecroval.gov.ao',
//             to: user.email,
//             subject: "Conta Criada com sucesso - tecroval",
//             text: " ",

//             html: " Ola,<br><br> Bem Vindo ao tecroval . <br> a tua conta foi criada com sucesso  <br><br> clique no link abaixo para activar a sua conta   <br><br> <br> siga-nos nas redes sociais e mantenha-se actualizado(a) sobre as  <strong>  bolsas de estudo   </strong> <br><br>  "
//         }).then(info => {
//             user.email_valido = 1
//             //  this.activarEmail(user) 

//             console.log(info);
//                  }).catch(err => {
           
//             user.email_valido = 0 
//             console.log(err);
//         });

//         //console.log("--------------------------------------------------------------------")
//     }


//     static enviarEmailRecuperacaoSenha(user) {
//         console.log("enviar email de recuperação de senha do usuario.............")

       
//         let transporter = nodemailer.createTransport({
//             host: "mail3.gov.ao",
//             port: 465,
//             auth: {
//                 user: 'suporte@tecroval.gov.ao',
//                 pass: 'nhe4GXbdm3rlTIxc9yH'
//             }
//         });


//         transporter.sendMail({
//             from: 'suporte@tecroval.gov.ao',
//             to: user.email,
//             subject: "Email para recuperação de Senha - tecroval  ",
//             text: " ",
//             html: " Ola <strong> " + user.username + " </strong> ,<br><br> Vamos ajudar a recuperar a sua conta <br> demora apenas alguns segundos <br><br><strong> o seu codigo de recuperação de senha é :  " + user.token + " </strong> <br> <br>  válido por 24 horas    <br> <br> o seu Login de acesso é:  <strong> " + user.username + "</strong> <br><br>  ou clica neste link para recuperar a senha <br>  https://tecroval.gov.ao/#/recuperar-senha-link/"+ user.bi +"/"+ user.token+" <br><br>Se você não fez essa solicitação,entre em contacto com o nosso suporte, email: suporte@tecroval.gov.ao, whatsapp: +244 940 807 279. <br>  <br>  <strong>  tecroval  <br> Formar o cidadão para melhor Servir o País</strong>  "
        
        
      
//         }).then(info => {
//           //  user.email_valido = 1
//             console.log("email enviado com sucesso   ....")

//               User.query().where({ id: user?.id }).update({ email_valido: 1 })
      
             
             
            
//            console.log(info); 
//         }).catch(err => { 
//        //  user.email_valido = 0 
//             console.log("erro email não enviado  ....")
//             User.query().where({ id: user?.id }).update({ email_valido: 0 })
      
//            console.log(err);
//         });

//         //console.log("--------------------------------------------------------------------")
//     }

//     async enviarEmailLogin(user) {
//         console.log(user)
//         //const user_find = await User.findByOrFail('email', username)

//     }




// }



 