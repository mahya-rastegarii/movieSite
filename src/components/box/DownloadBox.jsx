import React from 'react'

import { LuDownload} from 'react-icons/lu'

import Button from '../../components/Button/Button';

function DownloadBox({quality}) {
  return (
    <div className=" bg-color-4  rounded-2xl w-full flex flex-col space-y-2 sm:flex-row justify-between items-center py-3 px-4 ">
    <Button width="md:w-3/12  hover:scale-105" bgColor="bg-color-hover ">
      <LuDownload className='inline text-lg font-bold ml-2'/>
      دانلود با لینک مستقیم
    </Button>
    <h4 className=' font-bold sm:text-base text-sm '>{quality}<span className='ml-2 '>BluRay SoftSub</span></h4>
   </div>
  )
}

export default DownloadBox