
import { Link } from 'react-router-dom'

 const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center font-extrabold w-full h-screen space-y-4'>
    <h1 className=' text-8xl text-color-2'>404</h1>
    <p className='text-xl font-semibold text-color-3'>صفحه مورد نظر یافت نشد</p>
    <Link to='/'><span className=' text-slate-200 text-sm font-bold hover:text-white '> بازگشت به صفحه اصلی </span></Link>
    </div>
  )
}

export default NotFound ;