



import { RouterProvider } from "react-router-dom";

import router from './router';
import { supabase } from "./core/supabaseClient";
import { useEffect } from "react";
import { setSession, setUserName } from "./redux/slice/UserSlice";
import { useDispatch } from "react-redux";




function App() {
 
const dispatch = useDispatch();
  useEffect( () => {
    supabase.auth.getSession().then(
    async ( {data : {session}}) => {
  
      if(session) {
        
        const { data:profile, error }=await supabase.from("profile").select("userName").eq("userId", session.user.id).single()

        if(error) {
          console.error("Error" , error)
        }
        else {
          
          dispatch(setSession(session.user))
          dispatch(setUserName( profile.userName))
        }
         
         
      
      }
      else {
        dispatch(setSession(null))
        dispatch(setUserName(null))
      }
     })
  
  
    //  const { data: { subscription }} = supabase.auth.onAuthStateChange( async( _event, session) => {
    //   if(session) {
    //     const { data: profile, error} = await supabase.from("profile")
    //     .select("userName")
    //     .eq('userId', session.user.id).single()
  
    //     if(error) {
    //       console.error("Error feching profile:", error)
    //     } else {
    //       dispatch(setSession({...session, user: {...session.user, userName: profile.userName}}))
        
    //     }
    //   }
    //  else {
    //   dispatch(setSession(null))
    //  }
    
  
    //  })
  
    //  return () => 
    //   subscription.unsubscribe()
  }, [])
  
 
  return (
    
      <>
      
              <RouterProvider router={router} />
</>
         
   
   
  );
}

export default App;
