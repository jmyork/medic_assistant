// /* eslint-disable prettier/prettier */
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { ResponseHelper } from 'App/Helpers/ResponseHelper'
// // import { nodemailer} from "nodemailer" // Adonis' mail
// import User from 'App/Models/User/User'
// //import CriarUsuarioValidator from 'App/Validators/CriarUsuarioValidator'

// // const crypto = require('crypto') // crypto
// export default class AuthController {

//   //   public async logout({ auth, }: HttpContextContract) {
//   //       await auth.use('api').revoke()
//   //       auth.use('api').isLoggedOut
//   //     }

//   //     public async login({ auth, request }: HttpContextContract) {
//   //       let email = request.input('email')
//   //       const password = request.input('password')



//   //       let ObjectData:any
//   //       return ResponseHelper.getSuccessResponse('Login Feito com Sucesso', ObjectData)


//   //       try {
//   //         let user :any
//   //         user= await User.query().where({ email: email }).orWhere({ bi: email }).first()
//   //         if (!user) {
//   //            return ResponseHelper.getErrorResponse('email ou username não Encontrado...')
//   //         }
//   //         email = user.email
//   //         const token = await auth.use('api').attempt(email, password, {
//   //           expiresIn: '3000mins',
//   //           name: user?.serialize().email,
//   //         })

//   //         if (token) {
//   //             let ObjectData = { user, token }
//   //             // let result = Object.assign(user, token)
//   //              //console.log(email + "  Login administração Feito com Sucesso...");
//   //             return ResponseHelper.getSuccessResponse('Login Feito com Sucesso', ObjectData)

//   //         }

//   //         //console.log(email + "email ou palavra passe Incorrecta...");

//   //         return ResponseHelper.getErrorResponse('email, BI ou palavra passe Incorrecta')
//   //       } catch (error) {
//   //         console.log(error.message)



//   //         //console.log(email + "email ou palavra passe Incorrecta, verificar o email e senha ......");
//   //         return ResponseHelper.getErrorResponse(
//   //           'email,BI ou palavra passe Incorrecta...  verifica o email,BI e senha'
//   //         )
//   //       }
//   //     }




//   // public async store({ request }: HttpContextContract) {
//   //   try {

//   //     let data = request.only(['username', 'email',  'password', 'telefone', 'base_group_id' ])

//   //     // const data = await request.validate(CriarUsuarioValidator)
//   //     data.base_group_id = 3
//   //     data.username = data.email
//   //     let user: any
//   //     user = await User.query().where({ username: data.username }).orWhere({ email: data.email }).first()

//   //     if (user?.id) {
//   //     //  let email = user.email.split("@")
//   //         if (data.email == user.email)
//   //           return ResponseHelper.getErrorResponse('O email já está cadastrado ')

//   //     }
//   //     else {
//   //       user = await User.create(data)

//   //     }

//   //     return ResponseHelper.getSuccessResponse('Informação Salva com sucesso', data)
//   //   } catch (err) {
//   //     console.log(err.message)
//   //     return ResponseHelper.getErrorResponse('A Informação não foi Salva')
//   //   }
//   // }

//   // public async alterarPalavraPasseDoUsuario({ request }: HttpContextContract) {
//   //   try {
//   //     const dados = request.only(['id', 'password'])
//   //     const dados_all = request.all()
//   //     console.log(dados_all)
//   //     let user: any
//   //     let user_gestao: any
//   //     user = await User.query().where({ id: dados_all.id }).first()
//   //     user_gestao = await User.query().where({ id: dados_all.user }).first()


//   //     // validar quem ter permissão para alterar contas por via do super admin
//   //     // um utilizador com niveis de previligeio inferior não pode alter senha de utlizadore com niveis superior
//   //     if (user.id != user_gestao.id)
//   //       if (user_gestao?.base_group_id != 1) {
//   //         return ResponseHelper.getErrorResponse('Não tem permissão para alterar esta senha...')
//   //       }
//   //       else
//   //         if (user?.super_admin == 1 || user?.super_admin == 2) {
//   //           {
//   //             if (user_gestao?.super_admin > user?.super_admin)
//   //               return ResponseHelper.getErrorResponse('Não tem permissão para alterar esta senha...')
//   //           }
//   //         }
//   //     if (dados) {
//   //       const usuario = await User.findOrFail(dados.id)
//   //       usuario.merge(dados)
//   //       const resultado = await usuario.save()
//   //       return ResponseHelper.getSuccessResponse('Palavra passe alterada com sucesso', resultado)
//   //     }
//   //   } catch (err) {
//   //     console.log(err.message)
//   //     return ResponseHelper.getErrorResponse('A Informação não foi Salva')
//   //   }
//   // }





//   // async enviarEmailContaCriada(user) {
//   //   try {
//   //     console.log("enviar email de conta criada de senha do utilizador.............")
//   //     let transporter = nodemailer.createTransport({
//   //       host: "mail3.gov.ao",
//   //       port: 465,
//   //       auth: {
//   //         user: 'suporte@inagbe.gov.ao',
//   //         pass: 'nhe4GXbdm3rlTIxc9yH'
//   //       }
//   //     });
//   //     transporter.sendMail({
//   //       from: 'suporte@inagbe.gov.ao',
//   //       to: user.email,
//   //       subject: "Bem vindo ao Portal do INAGBE  ",
//   //       text: " ",
//   //       html: " Ola <strong> " + user.username + " </strong> ,<br><br> a sua conta foi criada com sucesso <br> está aqui as suas credencias de acesso . <br> Utilizador :" + user.username + " <br><br><strong> senha é: :  " + user.password + " </strong> <br>     <br>Se você não criou está conta, entre em contacto com o nosso suporte, email: suporte@inagbe.gov.ao, whatsapp: +244 940 807 279. <br>  <br>  <strong>  INAGBE  <br> Formar o cidadão para melhor Servir o País</strong>  "

//   //     }).then(info => {
//   //       console.log("sucesso ao enviar email de criação de conta  ....")
//   //       if (Number(user.email_valido) != 1) {
//   //         user.estado = 1;
//   //         user.email_valido = 1
//   //         this.activarEmail(user)
//   //       }
//   //       return info
//   //     }).catch(err => {
//   //       if (Number(user.email_valido) != 2) {
//   //         user.email_valido = 2
//   //         this.activarEmail(user)
//   //       }
//   //       console.log(err);
//   //       console.log("erro ao enviar email de criação de conta  ....")
//   //       return err
//   //     });

//   //   } catch (error) {
//   //   }

//   // }

//   // async enviarEmailRecuperacaoSenha(user) {

//   //   try {
//   //     console.log("enviar email de recuperação de senha do utilizador.............")
//   //     let transporter = nodemailer.createTransport({
//   //       host: "mail3.gov.ao",
//   //       port: 465,
//   //       auth: {
//   //         user: 'suporte@inagbe.gov.ao',
//   //         pass: 'nhe4GXbdm3rlTIxc9yH'
//   //       }
//   //     });

//   //     transporter.sendMail({
//   //       from: 'suporte@inagbe.gov.ao',
//   //       to: user.email,
//   //       subject: "Email para recuperação de Senha - INAGBE  ",
//   //       text: " ",
//   //       html: " Ola <strong> " + user.username + " </strong> ,<br><br> Vamos ajudar a recuperar a sua conta <br> demora apenas alguns segundos <br><br><strong> o seu codigo de recuperação de senha é :  " + user.token + " </strong> <br> <br>  válido por 24 horas    <br> <br> o seu Login de acesso é:  <strong> " + user.username + "</strong>    <br>Se você não fez essa solicitação,entre em contacto com o nosso suporte, email: suporte@inagbe.gov.ao, whatsapp: +244 940 807 279. <br>  <br>  <strong>  INAGBE  <br> Formar o cidadão para melhor Servir o País</strong>  "

//   //     }).then(info => {

//   //       console.log("sucesso ao enviar email de recuperaçao  ....")
//   //       if (Number(user.email_valido) != 1) {
//   //         user.estado = 1;
//   //         user.email_valido = 1
//   //         this.activarEmail(user)
//   //       }

//   //       return info
//   //     }).catch(err => {
//   //       if (Number(user.email_valido) != 2) {

//   //         user.email_valido = 2
//   //         this.activarEmail(user)
//   //       }
//   //       console.log(err);
//   //       console.log("erro ao enviar email de recuperaçao  ....")
//   //       return err
//   //     });

//   //   } catch (error) {
//   //     console.log("erro do serviço de email ....")
//   //   }

//   //   //console.log("--------------------------------------------------------------------")
//   // }

//   // async activarEmail(data) {
//   //   console.log("activar email  ....")
//   //   console.log(data?.id)
//   //   console.log(data?.email_valido)
//   //   await User.query().where({ id: data.id }).update({ email_valido: data.email_valido })
//   // }
//   // async activarTelefone(data) {

//   //   console.log("desativar email  ....")
//   //   await User.query().where({ id: data.id }).update({ telefone_valido: data.telefone_valido })
//   // }

//   // async receberEmail({ request, }) {

//   //   //  return ResponseHelper.getErrorResponse("a criação de contas foi desabilitada para novos candidatos!...")
//   //   const data = request.only(['username', 'email']);

//   //   let user: any
//   //   user = await User.query().where({ email: data.email }).first();
//   //   //    EmailHelper.enviarEmailNovaConta(user);
//   //   try {
//   //     if (user) {
//   //       let user_result = user;
//   //       const token = await crypto.randomBytes(4).toString('hex')
//   //       user.token_created_at = new Date()
//   //       user.token = token

//   //       if (Number(user.email_valido) == 2) {

//   //         return ResponseHelper.getErrorResponse("Não foi possivel enviar um email para recuperação da senha, verifica se o email existe!. ")
//   //       }

//   //       await user.save();
//   //       await this.enviarEmailRecuperacaoSenha(user);




//   //       return ResponseHelper.getSuccessResponse("Email enviado com sucesso  ", user_result)
//   //       // return ResponseHelper.getSuccessResponse("Senha Actualizada com sucesso", user_result)
//   //     } else {
//   //       //       this.registarLog(data.email, "", "user", 'recuperacaosenha', "0", "-", "-", "senha  não actualizada");
//   //       return ResponseHelper.getErrorResponse("email não existe")
//   //     }
//   //   } catch (err) {
//   //     console.log(err.message)
//   //     //   this.registarLog(data.email, "", "user", 'trocarSenha', "0", "ip", "pais", err.message);

//   //     return ResponseHelper.getErrorResponse("o email não existe")
//   //   }

//   // }

// }