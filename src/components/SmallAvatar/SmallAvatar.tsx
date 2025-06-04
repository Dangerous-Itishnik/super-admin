
import Image from 'next/image'

import Default from "../../assets/icons/svg/person.svg"
type Props = {
  url: string
}
export const SmallAvatar = ({ url }: Props) => {

    return (
    <div style={{backgroundColor: 'whitesmoke', borderRadius: '50%'}}>
      <Image
        alt={'pic'}
        height={32}
        priority
        sizes={'22vw'}
        src={url ? url : Default}
        style={{ borderRadius: '50%' }}
        width={32}
      />
    </div>
  )
}

export default SmallAvatar
