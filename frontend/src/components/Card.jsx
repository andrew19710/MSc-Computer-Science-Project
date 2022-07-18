import { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const [castles, setCastles] = useState([]);

  const getCastlesUrl = "/api/castles";

  useEffect(() => {
    axios
      .get(`${getCastlesUrl}`)
      .then(res => {
        setCastles(res.data);
      })
      .catch(err => {
        setCastles();
        console.log(err);
      });
  }, []);

  function pushCastleDataToLocalStorage() {
    window.localStorage.setItem("all_castle_data", JSON.stringify(castles));
  }
  pushCastleDataToLocalStorage();

  return (
    <div className="bg-gray-100" id="allcastles">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                Explore the Castles
              </h2>
              <p className="mt-3 mb-3 max-w-md mx-auto text-xl text-gray-500 sm:mt-5">
                We have a wide range of castles to visit.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {castles ? (castles.map((castle) => (
            <a key={castle.id} href={castle.href} className="group" rel="noreferrer" target="_blank">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  loading="lazy"
                  src={castle.imageSrc}
                  alt={castle.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-amber-700">{castle.name}</h3>
              <p className="mt-1 text-sm text-justify font-normal text-gray-600">{castle.imageAlt}</p>
              <p className="mt-1 text-md text-right font-semibold text-gray-800">&#xa3;{castle.price}pp</p>
            </a>
          ))) : (<div className="mx-auto text-center"><p className="mx-auto mt-4 text-lg font-bold text-amber-700" >Sorry, no castles found 🙁</p></div>)}
        </div>
      </div>
    </div>
  );
};

export default Card;