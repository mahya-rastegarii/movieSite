





import PostType from "../Button/PostType";


import Button from "../Button/Button";

import { GenresData } from "../../fetch/genere-data";

export default function GenreSideBar() {
 


  

  
  

  

 
  return (
    <div className=" w-full  flex flex-col justify-center items-center shadow-md bg-color-3 rounded-md p-3 space-y-4 font-semibold text-sm  text-color-1 ml-2">
      {/* {
  
       genreError && toast.error(genreError)
      } */}
      {/* <div className=" flex justify-center items-center bg-color-4 rounded-xl p-2 ">

                <a href="#" className=' custom-hover-btn '><span > فیلم </span></a>

                <a href="#" className=' custom- hover-btn '><span > سریال </span></a>
      </div> */}
      <div className=" w-7/12 ">
        <PostType changeActiveButton={() => {}} />
      </div>
      <span className=" font-semibold text-sm  text-color-1"> ژانر ها </span>

     
        <>
          <div className=" w-full shadow-md flex justify-between items-center p-2 bg-color-2 rounded-xl  hover:bg-color-hover cursor-pointer custom-transition delay-150">
            <div className=" w-full " >
              <span>همه</span>
            </div>
            {/* <span>{countAll}</span> */}
          </div>

          <div className="w-full grid gap-3 justify-items-center grid-cols-1 md:grid-cols-2">
            {GenresData?.map((genre, index) => (
              // <div className=" w-full shadow-md  flex justify-center items-center p-2 bg-color-2 rounded-xl  hover:bg-color-hover cursor-pointer custom-transition delay-150" onClick={getDataGenre} key={index}>
              <Button
                width="w-full"
                // active={activeGenre === genre}
                bgColor=" bg-color-2"
                // clicked={getDataGenre}
                key={index}
              >
                {genre}
              </Button>

              // </div>
            ))}
          </div>
        </>
    </div>
  );
}
