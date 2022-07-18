
// @ts-check

import { useState } from 'react';
import { FaBus, FaWalking } from 'react-icons/fa';
import { GiBusStop } from 'react-icons/gi';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const EachBusOnward = (onwardbustimings) => {

  const [onwardactive, setOnwardActive] = useState(0);

  const localstorage = window.localStorage;

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-2 sm:py-4 lg:max-w-7xl">
          <h2 className="sr-only">Bus Journey</h2>
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 sm:gap-x-2 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-4">
            {onwardbustimings.onwardbustiming.map(availableonwardbus => (
              <button key={availableonwardbus.busid}
                className={classNames(onwardactive ? "bg-teal-100" : "", "focus:outline-none focus:ring focus:ring-teal-100 rounded-lg"
                )}
                onClick={() => {
                  localstorage.setItem("usr_onward_jr", JSON.stringify(availableonwardbus));
                  setOnwardActive(availableonwardbus.busid);
                }}>
                <div className={classNames(availableonwardbus.busid === onwardactive ? "bg-teal-100" : "", "relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden flex-wrap")}>
                  <div className="p-3 space-y-2 flex flex-col bg-emerald-800 text-slate-50 border border-emerald-800">
                    <div className="grid grid-cols-3">
                      <p className="place-self-start sm:place-self-end font-bold">{availableonwardbus.journeystarttime.slice(0, 2) + ":" + availableonwardbus.journeystarttime.slice(2, 4)}</p>
                      <p className="place-self-center">&rarr;</p>
                      <p className="place-self-end sm:place-self-start font-bold">{availableonwardbus.journeyendtime.slice(0, 2) + ":" + availableonwardbus.journeyendtime.slice(2, 4)}</p>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 text-lg m-4">
                      <ul className="flex flex-col space-y-2 mx-auto">
                        {
                          availableonwardbus.path.map(eachPath => (
                            <div key={eachPath.pathid}>
                              <li className="flex items-center" key={eachPath.pathid}>
                                <GiBusStop className="h-8 w-8 text-gray-700" />
                                <span className="ml-3">{eachPath.routesrc}</span>
                                <span className="ml-3 text-sm">{eachPath.routestarttime.slice(0, 2) + ":" + eachPath.routestarttime.slice(2, 4)}</span>
                              </li>
                              <li className="flex items-center">
                                <span className="ml-2">&darr;</span>
                              </li>
                              <li className="flex items-center">
                                {eachPath.routeserviceprovider.toLowerCase() === "walk" ? (<FaWalking className="h-8 w-8 text-gray-700" />) : (<FaBus className="h-8 w-8 text-gray-700" />)}
                                <span className="ml-3 font-semibold">{eachPath.routename}</span>
                                {eachPath.routeserviceprovider.toLowerCase() !== "walk" ? (<span className="ml-1 text-sm text-violet-600 uppercase">{eachPath.routeserviceprovider}</span>) : null}
                              </li>
                              <li className="flex items-center">
                                <span className="ml-2">&darr;</span>
                              </li>
                              <li className="flex items-center">
                                <GiBusStop className="h-8 w-8 text-gray-700" />
                                <span className="ml-3">{eachPath.routedest}</span>
                                <span className="ml-3 text-sm">{eachPath.routeendtime.slice(0, 2) + ":" + eachPath.routeendtime.slice(2, 4)}</span>
                              </li>
                              {availableonwardbus.path.length - 1 >= eachPath.pathid ? (<hr className="border-violet-500" />) : (null)}
                            </div>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachBusOnward;