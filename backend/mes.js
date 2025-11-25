// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/auth/User'
// import Aco from 'App/Models/Aco'
// import { GeneralConstants } from '../Constants/GeneralConstants';
// import { ResponseHelper } from 'App/Helpers/ResponseHelper';
// import Apitoken from 'App/Models/auth/Apitoken';
// import myHelpers from 'App/Helpers/index'
// const geoip = require('geoip-lite')

// //const IP = require('ip'); 
// export default class LogRequest {


//   public async handle({ request, auth, response }: HttpContextContract, next: () => Promise<void>) {
//     console.log("**********************************************")
//     console.log("*consulta api ..." + request.input('app_') + " - " + request.url())
//     const ip_client = request.header('X-Real-Ip') ? request.header('X-Real-Ip') : request.ip()
//     const geo = geoip.lookup(ip_client);

//     // assegurar refresh do token de 15 minutos
//     let source = request.input('app_')
//     //  console.log(ip_client);
//     //  console.log(geo?.city); 
//     console.log(geo?.country);
//     console.log(geo?.timezone);

//     let is_mult_db: any = await myHelpers.checkMultdbConfig()

//     if (!auth.use('api').isLoggedIn) {
//       if (is_mult_db) {

//         console.log(source + " - " + request.url());
//         if (!source)
//           response.unauthorized({ error: 'deve definir a chave publica na requisição...' })

//         const result: any = await myHelpers.setTenantDB(source, request, auth)
//         if (result?.status == 0)
//           response.unauthorized({ error: 'acesso invalido.' })
//       }
//     }
//     //*/
//     //-------------------fim da gestão de mult db ----------------------------------------
//     const router_url = request.url()
//     const router_split_api = router_url.split("v1/")
//     const router = router_split_api[1].split("/")
//     const result_token = auth.use('api')
//     const funcionalidade = router[0]

//     if (auth.use('api').isLoggedIn) {
//       const date_actual: any = new Date()
//       const token_actual: any = auth.use('api').token
//       console.log(auth.use('api').token?.tokenHash)
//       console.log("#-----------------------------------------#");
//       const date_token_expired: any = auth.use('api').token?.expiresAt
//       if (date_actual < date_token_expired) {
//         date_actual.setMinutes(date_actual.getMinutes() + 15)
//         await Apitoken.query().where({ token: token_actual.tokenHash }).update({ expires_at: date_actual })
//       }
//       // não permitir que o tokem seja utilizado por um IP que não é o que autentiticou.
//       const ip_token = token_actual?.meta?.ip_address
//       const ip_request = request.header('X-Real-Ip') ? request.header('X-Real-Ip') : request.ip()
//       if (ip_token != ip_request) {
//         // await auth.use('api').revoke()
//         console.log('possivel Roubo de token, IP-original -' + ip_token)
//         console.log("------------------------------------------------");
//         ResponseHelper.getErrorResponseWithLogRegisterCritico('Token invalido.', 'Roubo de token, IP-original -' + ip_token, request, auth, ip_token)
//         //  return response.unauthorized({ error: 'Token invalido.' });
//       }
//     }

//     //let originRequest = await this.origenSolitidada(request, auth)

//     let permissions_constant = await this.validarPerimissionPortal(router[0])
//     if (!permissions_constant)
//       if (funcionalidade != 'login') {
//         if (await auth.use('api').check() && auth.use('api').isLoggedIn) {
//           let permissions_constant = await this.validarPerimissionConstants(result_token.user?.acl_group_id, router[0])
//           if (!permissions_constant) {
//             //  console.log("*** sem permissão para aceder ao recurso solicitado estatico..." + router[0])
//             let permission_db = await this.validarPermissionsDb(request, auth);
//             if (!permission_db) {
//               //   console.log("***  sem permissão para aceder ao recurso solicitado dinamico..." + router[0])
//               //   console.log("-------------------------------------------------------------")
//               //  response.unauthorized({ error: 'sem permissão para aceder ao recurso solicitado.' })
//               //    console.log("-------------------------------------------------------------")

//               return;
//             }
//             //   console.log("***  com  permissão para aceder ao recurso solicitado dinamico..." + router[0])
//           }
//           else {
//             //  console.log("*** permissão aceite para recurso estatistico para -  " + router[0])
//           }
//         }
//         else {
//           //  response.unauthorized({ error: 'utilizador não autenticado.' })
//           //  return;
//         }
//       }

//       else {

//       }

//     console.log("validacação mildware feita com sucesso liberado............ ")
//     await next()
//     // code for middleware goes here. ABOVE THE NEXT CALL
//   }



//   public async validarPermissionsDb(request, auth) {
//     // call next to advance the request
//     try {
//       let token_headers = await auth.use('api')
//       if (await auth.use('api').check() && auth.use('api').isLoggedIn) {
//         const user_auth = token_headers.user

//         const user: any = await User.query().where({ email: user_auth.email }).first()

//         if ((Number(user.super_admin) == 1 || Number(user.super_admin) == 2) && Number(user.acl_group_id) == 1 && Number(user.estado) == 1) {
//           return true
//         }




//         let token_created_at = new Date();
//         //toke refresh
//         await User.query().where({ email: user_auth.email }).update({ token_created_at: token_created_at })
//         let router_url = request.url()
//         let router_split_api = router_url.split("v1/")
//         let router = router_split_api[1].split("/")
//         let recurso_solicitado = router[0]
//         let permissao: any = await Aco.query()
//           .select(['acl_acos.id', 'acl_acos.controller', 'acl_acos.funcao', 'acl_acos.estado',])
//           .innerJoin('acl_groups_acos', 'acl_acos.id', 'acl_groups_acos.acl_aco_id')
//           .innerJoin('acl_groups', 'acl_groups.id', 'acl_groups_acos.acl_group_id')
//           .innerJoin('acl_groups_users', 'acl_groups.id', 'acl_groups_users.acl_group_id')
//           .where('acl_groups_users.user_id', user_auth.id)
//           // .where('acl_groups_users.acl_group_id', user_auth.acl_group_id)
//           .where('acl_groups_users.estado', 1)
//           .where('acl_acos.funcao', recurso_solicitado)
//           .where('acl_acos.estado', 1).first()

//         if (permissao?.funcao) {
//           return true
//         }
//         else {
//           return false
//         }
//       } else {
//         return false
//       }
//     } catch (error) {
//       console.log(error)
//       return false
//     }
//   }


//   public async validarPerimissionPortal(router) {
//     let routa_exist = GeneralConstants.getRouterPortal.filter(p => p.nome == router)
//     if (routa_exist[0]?.id) {
//       return true
//     }
//     return false
//   }


//   public async validarPerimissionConstants(groups, router) {
//     console.log(groups?.id)
//     console.log(router?.id)
//     return true


//   }


//   public async origenSolitidada(request, auth) {

//     console.log(auth?.email)
//     console.log(request.headers().origin ? request.headers().origin + request.url() : "origem-desconhecida-" + request.url())
//     let referer = request.headers().referer

//     if (request.headers().origin != referer?.substring(0, referer.length - 1)) {
//       // this.registarLog("", request.headers().origin ? request.headers().origin : "origem-desconhecida", request.url(), 'não autorizado', 'ipAddress', '-', '-', 'permissão')

//       return false
//     }

//     if (request.headers().origin != "http://suporte.tecroval.info" && request.headers().origin != "https://tecroval.gov.ao" && request.headers().origin != "http://srv02" &&
//       request.headers().origin != "http://sgbe3.tecroval.info" && request.headers().origin != "http://camoes.tecroval.info" &&
//       request.headers().origin != "http://tecroval.info" && request.headers().origin != "https://ies.tecroval.gov.ao" && request.headers().origin != "http://gesttecroval.mes.gov.ao"

//       && request.headers().origin != "https://sgbe.tecrovalangola.com" && request.headers().origin != "http://srv01" && request.headers().origin != "http://localhost:4251" &&
//       request.headers().origin != "http://localhost:4252" &&
//       request.headers().origin != "http://localhost:4253" &&
//       request.headers().origin != "http://localhost" &&
//       request.headers().origin != "http://localhost:4006"
//       //*/
//     ) {
//       //  this.registarLog("", request.headers().origin ? request.headers().origin : "origem-desconhecida", request.url(), 'não autorizado', 'ipAddress', '-', '-', 'permissão')

//       return false
//     }
//     // this.registarLog("", request.headers().origin ? request.headers().origin : "origem-desconhecida", request.url(), 'autorizado', 'ipAddress', '-', '-', 'permissão')
//     // referer
//     console.log(request.headers().origin ? request.headers().origin + request.url() : "origem-desconhecida-" + request.url())

//     return true

//   }


// }