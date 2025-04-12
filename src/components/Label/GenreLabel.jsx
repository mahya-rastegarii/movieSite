

export default function GenreLabel({children, borderColor}) {
  return (
    
    <span className={`${borderColor} border min-w-fit  bg-transparent  font-semibold rounded-xl px-3 py-1 mx-2 text-md `}>
        {children}
    </span>


  )
}
