

import { useEffect, useState } from 'react';
import PaginationButton from '../Button/PaginationButton'


 const PaginationBox = ({pages, setPage, activePage}) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  
  const prevPage = () => {
   
      setPage((oldPage) => (oldPage > 1 ? oldPage - 1 : 1));
    
  }
    
  const nextPage = () => {
    

    setPage((oldPage) => (oldPage < pages ? oldPage + 1 : pages));
  }

 
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth < 768;
  const isSmallScreen = windowWidth < 380; 

 

 
  return (


    <div className='flex justify-center items-center space-x-2'>
    <PaginationButton clicked={prevPage} disabled={activePage === 1}>
      <span className='text-sm m-2'>قبلی</span>
    </PaginationButton>

     {
     isSmallScreen ? (
         
          <>
           
            {activePage !== 1 && (
              <>
                <PaginationButton clicked={() => setPage(1)}>1</PaginationButton>
                {activePage > 2 && <span className="text-gray-500">...</span>}
              </>
            )}
  
           
            <PaginationButton activeBtn>{activePage}</PaginationButton>
  
          
            {activePage !== pages && (
              <>
                {activePage < pages - 1 && <span className="text-gray-500">...</span>}
                <PaginationButton clicked={() => setPage(pages)}>{pages}</PaginationButton>
              </>
            )}
          </>
        )
         :isMobile ?
     (
     <>
   
     {activePage > 2 && (
       <>
         <PaginationButton clicked={() => setPage(1)}>1</PaginationButton>
         {activePage > 3 && <span className="text-gray-500">...</span>}
       </>
     )}

    
     {activePage > 1 && (
       <PaginationButton clicked={() => setPage(activePage - 1)}>
         {activePage - 1}
       </PaginationButton>
     )}

   
     <PaginationButton activeBtn>{activePage}</PaginationButton>

    
     {activePage < pages && (
       <PaginationButton clicked={() => setPage(activePage + 1)}>
         {activePage + 1}
       </PaginationButton>
     )}

     
     {activePage < pages - 1 && (
       <>
         {activePage < pages - 2 && <span className="text-gray-500">...</span>}
         <PaginationButton clicked={() => setPage(pages)}>{pages}</PaginationButton>
       </>
     )}
   </>
 ) 
     
     : (
      
        <>
        
          {activePage > 3 && (
            <>
              <PaginationButton clicked={() => setPage(1)}>1</PaginationButton>
              {activePage > 4 && <span className="text-gray-500">...</span>}
            </>
          )}

         
          {activePage > 2 && (
            <PaginationButton clicked={() => setPage(activePage - 2)}>
              {activePage - 2}
            </PaginationButton>
          )}
          {activePage > 1 && (
            <PaginationButton clicked={() => setPage(activePage - 1)}>
              {activePage - 1}
            </PaginationButton>
          )}

        
          <PaginationButton activeBtn>{activePage}</PaginationButton>

         
          {activePage < pages && (
            <PaginationButton clicked={() => setPage(activePage + 1)}>
              {activePage + 1}
            </PaginationButton>
          )}
          {activePage < pages - 1 && (
            <PaginationButton clicked={() => setPage(activePage + 2)}>
              {activePage + 2}
            </PaginationButton>
          )}

       
          {activePage < pages - 2 && (
            <>
              {activePage < pages - 3 && <span className="text-gray-500">...</span>}
              <PaginationButton clicked={() => setPage(pages)}>{pages}</PaginationButton>
            </>
          )}
        </>
      )
     }
    <PaginationButton clicked={nextPage} disabled={activePage === pages}>
      <span className='m-2 text-sm'>بعدی</span>
    </PaginationButton>
  </div>
  )
}

export default PaginationBox;