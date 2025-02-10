
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import GenreReducer from './slice/GenreSlice';
import SliderDataReducer from './slice/SliderDataSlice';
import MoviesReducer from './slice/MoviesSlice'
import ThemeReducer from './slice/ThemeSlice';
import UserReducer from './slice/UserSlice';
import MenuReducer from './slice/MenuSlice';



const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, MoviesReducer);

export const store = configureStore({
  reducer: {
    genre: GenreReducer,
    slider: SliderDataReducer,
    movies: persistedReducer,
    theme: ThemeReducer,
    user: UserReducer,
    menu: MenuReducer,
  }
 
})

export const persistor = persistStore(store);