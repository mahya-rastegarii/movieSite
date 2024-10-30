
import PageBackdrop from '../Backdrop/PageBackdrop';
import MenuItem from '../Button/MenuItem';


export default function SidebarMenu() {
 
   
  return (
    <>
   <PageBackdrop />
     <div 
     className=
     'w-5/12 opacity-100  h-full p-1 bg-color-2 flex justify-center items-start  right-0 top-0 z-40 shadow-md pt-12 transition-all fixed ease-in-out delay-100'
     >
    
                   <ul className=' w-full mt-24 flex justify-center flex-col items-center'>
                 <div className='w-9/12 mb-16 mx-3 space-y-2'>
                    <MenuItem borderType="border" rounded='rounded-xl'>
                      ورود
                 </MenuItem>
                    <MenuItem  borderType="border" rounded="rounded-xl">
                      ثبت نام
                    </MenuItem>
                 </div>
                    <MenuItem borderType="border-y">
                      خانه
                    </MenuItem>
                    <MenuItem borderType="border-b">
                    250 فیلم برتر IMDb
                    </MenuItem>
                    <MenuItem borderType="border-b">
                    250 سریال برتر IMDb 
                    </MenuItem>
                    <MenuItem borderType="border-b">
                    همه فیلم ها
                    </MenuItem>
                    <MenuItem borderType="border-b">
                    همه سریال ها
                    </MenuItem>
                   
                   </ul>
      </div>
    </>
   
  )
}
