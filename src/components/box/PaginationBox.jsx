

import { useEffect, useState } from 'react';
import PaginationButton from '../Button/PaginationButton'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import _ from "lodash";
// import { useParams } from 'react-router-dom';
const PaginationBox = ({pages, setPage, activePage}) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  
  const prevPage = () => {
    // setPage( (oldPage) => {
    //   let prevPage = oldPage - 1;
    //   if(prevPage < 1) {
    //     prevPage = pages;
    //   }
    
    // return prevPage;
      setPage((oldPage) => (oldPage > 1 ? oldPage - 1 : 1));
    // })
  }
    
  const nextPage = () => {
    // setPage( (oldPage) => {
    //   let nextPage = oldPage + 1;
    //   if(nextPage > pages) {
    //     nextPage = 1 ;
       
    //   }
    
    //   return nextPage;
    // })

    setPage((oldPage) => (oldPage < pages ? oldPage + 1 : pages));
  }

  // const paginationBtnHandler= (index)=> {
  //    let pageNum = index+1
  //   setPage(pageNum);
  //   page +  pageNum;
  // }
  const handlePageClick = (page) => {
    setPage(page);
  };

  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth < 768;
  const isSmallScreen = windowWidth < 380; 

 

 
  return (
    // <div className=' flex justify-center items-center'>
    // <PaginationButton clicked={prevPage}>
    //    <span className=' text-sm m-2'> قبلی</span>
    // </PaginationButton>
    //  {
    //   _.times( pages, (index) => (
    //     <PaginationButton key={` pages`+ index}  activeBtn={index + 1 === activePage} clicked={() =>handlePageClick(index+ 1)}>
       
    //     { index + 1}
    //     </PaginationButton>

    //   ))
    //  }
    //  <PaginationButton  clicked={nextPage}>
    //  <span className=' m-2 text-sm'>بعدی</span>
    // </PaginationButton>

    // </div>

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
  
            {/* صفحه فعال */}
            <PaginationButton activeBtn>{activePage}</PaginationButton>
  
            {/* صفحه آخر */}
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
     {/* صفحه اول و سه نقطه */}
     {activePage > 2 && (
       <>
         <PaginationButton clicked={() => setPage(1)}>1</PaginationButton>
         {activePage > 3 && <span className="text-gray-500">...</span>}
       </>
     )}

     {/* صفحه قبل از صفحه فعال */}
     {activePage > 1 && (
       <PaginationButton clicked={() => setPage(activePage - 1)}>
         {activePage - 1}
       </PaginationButton>
     )}

     {/* صفحه فعال */}
     <PaginationButton activeBtn>{activePage}</PaginationButton>

     {/* صفحه بعد از صفحه فعال */}
     {activePage < pages && (
       <PaginationButton clicked={() => setPage(activePage + 1)}>
         {activePage + 1}
       </PaginationButton>
     )}

     {/* سه نقطه و صفحه آخر */}
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
          {/* صفحه اول */}
          {activePage > 3 && (
            <>
              <PaginationButton clicked={() => setPage(1)}>1</PaginationButton>
              {activePage > 4 && <span className="text-gray-500">...</span>}
            </>
          )}

          {/* دو صفحه قبل از صفحه فعال */}
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

          {/* صفحه فعال */}
          <PaginationButton activeBtn>{activePage}</PaginationButton>

          {/* دو صفحه بعد از صفحه فعال */}
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

          {/* صفحه آخر */}
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