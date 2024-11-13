
import {  BsMoon, BsSun } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/slice/ThemeSlice';


export default function ChangeThemeButton() {
  

  const theme = useSelector( state => state.theme.activeTheme);

  const element = document.documentElement;

  const dispatch = useDispatch();



  const changeThemeHandler = () => {
    if(theme === "dark") {
      dispatch(changeTheme("light"));
      element.classList.remove('dark')
    } else {
      dispatch(changeTheme('dark'));
      element.classList.add('dark')
    }
    
  }

  return (

   
    <button className=' outline-none custom-transition ' onClick={changeThemeHandler}>

    {
      theme === "dark" ? <BsSun className=' text-color-2  inline text-2xl'/> : <BsMoon className=' text-color-2  inline text-2xl'/>
    }
  </button>
  )
}
