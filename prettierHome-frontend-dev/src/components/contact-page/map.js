import React from 'react'
import { config } from '../../helpers/config'

const Map = () => {
  return (
    <iframe src={config.contact.mapEmbedURL} 
    width="100%" 
    height="450"
     allowFullScreen="" 
     loading="lazy" 
     referrerPolicy="no-referrer-when-downgrade">

     </iframe>
  )
}

export default Map