


const ShowItemNavSearch = ({ item, setSearchInput }) => {

  




 
  return (
    <div
      className="  text-white w-full  flex p-3 justify-between items-center border-b border-color-1 cursor-pointer hover:bg-color-4"
     
    >
      <span className=" w-8/12 text-center">{item.name}</span>
      <img
        className=" rounded-md shadow-xl  w-4/12  "
        src={item.pic}
        alt="itemImage"
      />
    </div>
  );
};

export default ShowItemNavSearch;
