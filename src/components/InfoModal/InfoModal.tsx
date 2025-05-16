import { ComponentPropsWithoutRef } from 'react'

import { Close } from '@/assets/icons/components'
import { Typography } from '@/common/components/Typography'
import { Button } from '@/common/components/button'
import * as Dialog from '@radix-ui/react-dialog'

import styles from '@/common/components/Modals/InfoModal/InfoModal.module.scss'

export type InfoModalProps = {
  modalTitle: string
  onClose: () => void
  open: boolean
} & ComponentPropsWithoutRef<'div'>

export const InfoModal = ({ children, modalTitle, onClose, open, ...rest }: InfoModalProps) => (
  <Dialog.Root onOpenChange={onClose} open={open} {...rest}>
    <Dialog.Trigger asChild />
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content className={styles.Content}>
        <Dialog.Title className={styles.title}>
          <Typography variant={'h2'}>{modalTitle}</Typography>
        </Dialog.Title>
        <Dialog.Description asChild>
          <div className={styles.Description}>{children}</div>
        </Dialog.Description>
        <Dialog.Close asChild>
          <Button className={styles.buttonClose} variant={'icon'}>
            <Close />
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
