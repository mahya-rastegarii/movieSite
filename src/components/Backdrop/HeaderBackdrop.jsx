


export default function HeaderBackdrop({ bg, children }) {
 

 

 
  return (
    <>
    

    
        <div
          className="w-full m-auto lg:h-screen z-10 after:w-full after:h-full after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:bg-black after:opacity-60 bg-no-repeat bg-cover bg-center drop-shadow-md flex-col space-y-7 lg:space-y-0 pb-4 lg:pb-0 flex lg:flex-row justify-end  lg:justify-around items-center transition-all ease-in-out duration-300 delay-0 object-cover"
          style={{ backgroundImage: `url(${bg})` }}
        >
          {children}
        </div>
     
    </>
  );
}
