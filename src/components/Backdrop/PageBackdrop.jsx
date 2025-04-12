
import { useDispatch } from 'react-redux'


export default function PageBackdrop({show, setShow, context}) {


  const dispatch = useDispatch()
  
 
  return (
    <>
    <div className={` ${show? 'w-full' : "w-0"}  h-full bg-black absolute top-0 left-0 opacity-90 z-30 `} onClick={() => context ? dispatch(setShow(false)) : setShow(false)}>
     
    </div>
    
    </>
  )
}
