import UsuarioService from "../services/UsuarioService";
import { Expo } from 'expo-server-sdk';
const expo = new Expo();
import fetch from 'node-fetch';

class MensajeController { 

	
static sendMessajeUnit(req, res) {   
  const { usuarioId, mensaje } = req.body              
    UsuarioService.getId(usuarioId) 
      .then((cliente) => {        
	  console.log(cliente.token)    
        let tick = sendMensaje(mensaje, cliente.token)
	/*sendToken()      */
        res.status(200).send({ result: tick });
      })        
      .catch((reason) => {                  
	console.log(reason)      
        res.status(400).send({ reason });
      });  
  }
};

async function sendToken (){
  let api = "ONnlhp_xS5WvgCBhcc0LmA=="	
  let mensaje = 'https://www.google.com/maps/place/-17.7974534,-63.2030157'	
  const response = await fetch(`https://platform.clickatell.com/messages/http/send?apiKey=ONnlhp_xS5WvgCBhcc0LmA==&to=59175600278&content=${mensaje}`, {method: 'GET'});
  	
}

function sendMensaje(mensaje, token)
{
  let tieckRes = {}
  let messages = [];  
  messages.push({
        /*to:  "ExponentPushToken[bGIfs1F0uGvHtBaY8_gSCQ]",*/
        to: token,
        sound: 'default',
        title:'Notificación',
        body: "`Binenvenidos a 1Click ` 😎",
        /*body: mensaje,*/
        data: { withSome: 'goes here' },
      })
 let chunks = expo.chunkPushNotifications(messages); 
  (async () => {      
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log('---------------------');
        console.log(ticketChunk);
        console.log('---------------------');
        tieckRes = ticketChunk
      } catch (error) {
        console.error(error);
      }
    }    
  })();	

  return tieckRes
}

export default MensajeController;
