import  {  useEffect, useState } from 'react';

import { BsHandThumbsUp, BsHandThumbsDown} from 'react-icons/bs'


import { useSelector } from 'react-redux';
import { supabase } from '../../core/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




export default function CommentBox({list}) {


  const session = useSelector( state => state.user.session);

  const navigate =useNavigate();

  const [dislikeUser, setDislikeUser]= useState();
  const [likeUser, setLikeUser]= useState();
 const [reaction, setReaction]= useState({
  isLiked: false,
  liked:[],
  isDisLiked:false,
  disLiked:[],
 })


 const likeHandler = async() => {

   
   if(session){
     
     try {
       
       if(list.userName === session.userName) return;
      if(reaction.liked?.includes(session.userId)) return;
      if(reaction.disLiked?.includes(session.userId)) {
        const disLikeComment = dislikeUser -1;
       
        const disLikeByComment = reaction.disLiked.filter( user => user !== session.userId);
        const {error} = await supabase.from("comments").update({disLike: disLikeComment, disLikeBy: disLikeByComment}).eq("id" , list.id);
        if(error) {
          throw error;
        } else {
          setDislikeUser(disLikeComment);
        }
        } 
        
        const likeComment = likeUser +1;
       
        reaction.liked.push(session.userId);
      
        
      
        const {error} = await supabase.from("comments").update({like: likeComment, likeBy:reaction.liked}).eq("id" , list.id);
        
         if(error) {
          throw error;
         } 
         setLikeUser(likeComment);
         setReaction({
          ...reaction,
          isDisLiked: false,
          isLiked: true
         })
    } catch (err) {
      toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید");
      console.log(err)
    }
    

    
   
  } else navigate("/signIn")
 }
 


 const dislikeHandler=  async() => {

   

   if(session){
     
     try{
       
    if(list.userName === session.userName) return;
    if(reaction.disLiked?.includes(session.userId)) return;
    if(reaction.liked?.includes(session.userId)) {
      const likeComment = likeUser -1;
     
       const likeByComment = reaction.liked.filter( user => user !== session.userId)
      const {error} = await supabase.from("comments").update({like: likeComment, likeBy: likeByComment}).eq("id" , list.id);
      if(error) {
        throw error;
      } else {
        setLikeUser(likeComment)
    
      }
      }
      const disLikeComment = dislikeUser +1;
      
      reaction.disLiked.push(session.userId);
      const {error} = await supabase.from("comments").update({disLike: disLikeComment, disLikeBy: reaction.disLiked}).eq("id" , list.id);
       if(error) {
        throw error;
       } 
       setDislikeUser(disLikeComment);
       setReaction({
        ...reaction,
        isLiked: false,
        isDisLiked: true
       })
  } catch (err) {
    toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید")
    console.log(err)
  }

  } else navigate("/signIn")
 
  }



 useEffect(() => {
  setDislikeUser(list.disLike);
  setLikeUser(list.like);
  setReaction({
    isLiked: list.likeBy?.includes(session?.userId) ? true : false,
    isDisLiked: list.disLikeBy?.includes(session?.userId) ? true : false,
    liked: list.likeBy || [],
    disLiked: list.disLikeBy || [],
  })
 
  
 }, [list])



  return (
    <div className={`  rounded-2xl w-full flex justify-between items-center py-3 px-4 ${list.userName === session?.userName ? "bg-color-2" : ' bg-color-4'}`}>
      <div className=" flex justify-start items-center">
       <div className=" flex justify-center items-center">
       <div className="flex flex-col items-start justify-center space-y-2 mx-3">

          <button ><BsHandThumbsDown  className={` inline text-2xl text-red-500  ${reaction.isDisLiked ? "cursor-default text-red-800" :'text-red-500 cursor-pointer' }  ${list.userName === session?.userName || reaction.isDisLiked ? " cursor-default" : "hover:scale-110 cursor-pointer"}`} onClick={dislikeHandler}/></button>
          <span className='text-sm '>{dislikeUser}</span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 ">
          <button><BsHandThumbsUp className={` inline text-2xl text-green-500  ${reaction.isLiked  ? "cursor-default text-green-800" :'text-green-500 cursor-pointer' } ${list.userName === session?.userName || reaction.isLiked ? " cursor-default" : "hover:scale-110 cursor-pointer "}`} onClick={likeHandler}/></button>
          <span className='text-sm '>{likeUser}</span>
        </div>
       
       </div>
       <div className=' w-full flex- flex-col justify-center items-center space-y-3 mr-6'>
       
        <div className="flex w-full justify-start  items-center ">
        
         
        <span className=' text-sm text-color-2'> {list.userName === session?.userName ? "شما" : list.userName} </span>
        </div>
        

        <div className={"backdrop-blur-md" }>
        <p className=" text-sm">{list.comment} </p>
        </div>
       </div>
       </div>
      
      
    </div>
  )
}
