import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgPolygonUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={8}
    height={5}
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path d="M4 0L0.535898 4.5L7.4641 4.5L4 0Z" fill="currentColor" />
  </svg>
)

const ForwardRef = forwardRef(SvgPolygonUp)
const Memo = memo(ForwardRef)

export default Memo
