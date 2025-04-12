
export default function BgRotate({children, padding, width, rotate1, rotate2}) {
  return (
    <div className={`${width ? width : "w-full"} rounded-xl bg-color-2 ${ rotate1 ? rotate1 : "md:-rotate-3 -rotate-1"}  shadow-md `}>
        <div className={`bg-color-3 w-full ${padding}  rounded-xl ${rotate2 ? rotate2 : "md:rotate-3 rotate-1"}  `}>
                { children }
        </div>
    </div>
  )
}
