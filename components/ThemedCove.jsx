import { Image, useColorScheme } from 'react-native'

// images
import DarkCove from '../assets/img/DarkCove.png'
import LightCove from '../assets/img/LightCove.png'

const ThemedCove = ({...props}) => {
  const colorScheme = useColorScheme()
  
  const cove = colorScheme === 'light' ? DarkCove : LightCove

  return (
    <Image source={cove} {...props} />
  )
}

export default ThemedCove