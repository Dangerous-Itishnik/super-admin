import { useState } from 'react'

import { SvgOutlineBell } from '@/assets/icons/components/OutlineBell'

export const BellButton = () => {
  const [openNotification, setOpenNotification] = useState<boolean>(false)

  const handelNotificationWindowToggle = () => {
    setOpenNotification(prevState => !prevState)
  }

  return (
    <div>
      <button onClick={handelNotificationWindowToggle} type={'button'}>
        <SvgOutlineBell />
      </button>
      {
        //отображение компоненты модального окна с уведомлениями
        openNotification ?? <div></div>
      }
    </div>
  )
}
