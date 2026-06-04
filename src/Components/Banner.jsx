import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-[url('/assets/banner.jpg')] text-white flex justify-between flex-col items-center gap-5 h-[600px] bg-cover bg-center">
      
      <div className="p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1">
        <h1 className="text-7xl">
          Find Your <br /> Perfect Study Room
        </h1>

        <p className="text-2xl">
          Browse and book quiet, private study rooms in your library. List your own room and earn.
        </p>

        <div className="flex gap-5">
         <Link href={'/rooms'}> <button className="uppercase bg-cyan-500 px-5 py-3 cursor-pointer">
            Explore rooms
          </button></Link>
        </div>
      </div>

    </div>
  );
};

export default Banner;