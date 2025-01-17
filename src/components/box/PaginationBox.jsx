

import { useState } from 'react';
import PaginationButton from '../Button/PaginationButton'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import _ from "lodash";
import { useParams } from 'react-router-dom';
const PaginationBox = ({pages, setPage, activePage}) => {

  const [disableBtn, setDisableBtn] =useState(false)
  
  const prevPage = () => {
    setPage( (oldPage) => {
      let prevPage = oldPage - 1;
      if(prevPage < 1) {
        prevPage = pages;
      }
    
    return prevPage;
    })
  }
    
  const nextPage = () => {
    setPage( (oldPage) => {
      let nextPage = oldPage + 1;
      if(nextPage > pages) {
        nextPage = 1 ;
       
      }
    
      return nextPage;
    })
  }

  // const paginationBtnHandler= (index)=> {
  //    let pageNum = index+1
  //   setPage(pageNum);
  //   page +  pageNum;
  // }
  const handlePageClick = (page) => {
    setPage(page);
  };
  return (
    <div className=' flex justify-center items-center'>
    <PaginationButton clicked={prevPage}>
       <span className=' text-sm m-2'> قبلی</span>
    </PaginationButton>
     {
      _.times( pages, (index) => (
        <PaginationButton key={` pages`+ index}  activeBtn={index + 1 === activePage} clicked={() =>handlePageClick(index+ 1)}>
       
        { index + 1}
        </PaginationButton>

      ))
     }
     <PaginationButton  clicked={nextPage}>
     <span className=' m-2 text-sm'>بعدی</span>
    </PaginationButton>

    </div>
  )
}

export default PaginationBox;