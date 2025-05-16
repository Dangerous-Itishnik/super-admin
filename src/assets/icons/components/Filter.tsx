import { Ref, SVGProps, forwardRef, memo } from 'react'

export const Filter = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={8}
    height={12}
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="currentColor" />
    <path d="M4 12L0.535898 7.5L7.4641 7.5L4 12Z" fill="currentColor" />
  </svg>
)

const ForwardRef = forwardRef(Filter)
const Memo = memo(ForwardRef)

export default Memo
