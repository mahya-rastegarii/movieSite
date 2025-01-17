



import {  RouterProvider } from "react-router-dom";

import router from './router';
import { supabase } from "./core/supabaseClient";
import { useEffect } from "react";
import { setSession } from "./redux/slice/UserSlice";
import { useDispatch } from "react-redux";
import { ActiveLinkPovider } from "./context/ActiveLinkContext";





function App() {
 
const dispatch = useDispatch();



  useEffect( () => {
    supabase.auth.getSession().then(
    async ( {data : {session}}) => {
  
      if(session) {
        
        const { data:profile, error }=await supabase.from("profile").select("*").eq("userId", session.user.id).single()
       
  
        if(error) {
          console.error("Error" , error)
        }
        else {
          
          
          dispatch(setSession( profile))
        }
         
         
      
      }
      else {
        dispatch(setSession(null))
       
      }
     })
  
    
  }, [])
  
 
  return (
    
      <>
                 
              <RouterProvider router={router} />
              
</>
         
   
   
  );
}

export default App;
