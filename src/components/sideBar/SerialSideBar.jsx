
import { MoviesData } from "../../fetch/movies-data";


export default function SerialSideBar() {
 
 
  

 

 

  return (
    <div className=" w-full flex flex-col justify-center shadow-md items-center bg-color-3 rounded-md p-3 space-y-4 font-semibold text-md h-full  text-color-1 lg:ml-2 ">
    
      <h3> سریال های به روز شده</h3>

      {MoviesData?.map((serial) => (
        <div
          className="w-full h-16 flex justify-center items-center rounded-md shadow-md p-2 bg-color-2  cursor-pointer hover:opacity-80 custom-transition"
          key={serial.id}
          // onClick={() => showSerial(serial.name)}
        >
          <div className=" w-2/12 h-full ml-2">
            <img
              className=" w-full h-full object-cover   rounded-md"
              src={serial.pic}
              alt={serial.name}
            />
          </div>
          <div className=" w-10/12  font-semibold">
            <p className=" mb-2 "> {serial.name}</p>
            {/* <span className=' text-sm bg-color-hover text-black rounded-md px-1 '> قسمت آخر فصل 2 اضافه شد</span> */}
          </div>
        </div>
      ))}
      {/* <div className="w-full flex justify-center items-center rounded-md shadow-md p-2 bg-color-2  cursor-pointer hover:opacity-80 custom-transition">
        <div className=' w-4/12 ml-2'>
            <img className=' object-cover' src={theLittleMermaid} alt="theLittleMermaid" />
        </div>
        <div className=' w-8/12  font-semibold'>
             <p className=' mb-2'> سریال ایست قلبی</p>
             <span className=' text-sm bg-color-hover text-black rounded-md px-1'> قسمت آخر فصل 2 اضافه شد</span>
        </div>
       </div>
       <div className="w-full flex justify-center items-center rounded-md shadow-md p-2 bg-color-2  cursor-pointer hover:opacity-80 custom-transition">
        <div className=' w-4/12 ml-2'>
            <img className=' object-cover' src={theLittleMermaid} alt="theLittleMermaid" />
        </div>
        <div className=' w-8/12  font-semibold'>
             <p className=' mb-2'> سریال ایست قلبی</p>
             <span className=' text-sm bg-color-hover text-black rounded-md px-1 '> قسمت آخر فصل 2 اضافه شد</span>
        </div>
       </div> */}
    </div>
  );
}
