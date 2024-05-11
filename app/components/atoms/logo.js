import Image from 'next/image'
import logo from '../../../app/logo.png'


function RitmoCatolicoLogo(){
    return (
        <Image
        src={logo}
        width={80}
        height={80}
        priority={true}
        quality={75}
        className='w-auto h-auto'
        alt="Logo do app ritmo católico"
        />
    )
}

export default RitmoCatolicoLogo;