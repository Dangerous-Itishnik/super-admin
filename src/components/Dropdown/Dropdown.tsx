import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import styles from './dropdown.module.scss'
type DropdownProps = {
  align?: 'center' | 'end' | 'start'
  children: ReactNode
  side?: 'bottom' | 'left' | 'right' | 'top'
  sideOffset?: number
  stayOpen?: boolean
  style?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>

export const Dropdown = forwardRef<ElementRef<typeof DropdownMenu.Trigger>, DropdownProps>(
  (
    {
      align,
      children,
      side = 'bottom',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sideOffset = 8,
      stayOpen = false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      style,
      trigger,
    }: DropdownProps,
    ref
  ) => {
    const [open, setOpen] = useState(false)

    return (
      <DropdownMenu.Root onOpenChange={setOpen} open={open}>
        <DropdownMenu.Trigger asChild ref={ref}>
          {trigger}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={align}
            className={styles.content}
            onClick={e => {
              e.stopPropagation()
              stayOpen ? setOpen(true) : setOpen(false)
            }}
            side={side}
          >
            <div className={styles.items}>{children}</div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)

type ItemProps = {
  children: ReactNode
  disabled?: boolean
  title?: string
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropdownItem = ({ children, disabled, onSelect, title, ...restProps }: ItemProps) => {
  return (
    <DropdownMenu.Item
      className={styles.item}
      disabled={disabled}
      onSelect={onSelect}
      title={title}
      {...restProps}
    >
      {children}
    </DropdownMenu.Item>
  )
}
