const sortArray = require('sort-array')
class formatear {
    static unificar(data1,latitude,longitude) {        
      const newData = []        
       data1.map((item) =>{           
         let tem = {}
            tem.id = item.id
            tem.nombres = item.nombres
            tem.filename = item.filename
            tem.direccion = item.direccion
            tem.descripcion = item.descripcion		
            tem.paqueteId  = item.paqueteId
            tem.celular = item.celular
            tem.telefono = item.telefono	            
            tem.kilometros = parseFloat(getDistanceBetweenPoints(item.latitude,item.longitude,latitude,longitude) * 0.001).toFixed(2)
            tem.latitude = parseFloat(item.latitude)
            tem.longitude = parseFloat(item.longitude)	
            tem.hinicio = item.Horarios.hinicio
            tem.hfin = item.Horarios.hfin
            tem.views = item.views
            tem.likes = item.likes	                    
            newData.push(tem)            
            })   
            return sortArray(newData, { by: 'kilometros',order: 'asc' })
    }   
     
}
function getDistanceBetweenPoints(lat1, lng1, lat2, lng2){
    // El radio del planeta tierra en metros.
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
}
function degreesToRadians(degrees){
    return degrees * Math.PI / 180;
}
export default formatear;