// @ts-check
import { HomeIcon } from "@heroicons/react/outline";
import { FaBus, FaWalking } from "react-icons/fa";
import { GiBusStop } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const PrintItinerary = () => {
  const navigate = useNavigate();

  const user_selected_onward_journey = JSON.parse(
    window.localStorage.getItem("usr_onward_jr")
  );

  const user_selected_return_journey = JSON.parse(
    window.localStorage.getItem("usr_return_jr")
  );

  const destination_location =
    user_selected_onward_journey.path[
      user_selected_onward_journey.path.length - 1
    ].routedest;

  const destination_location_toLowercase = destination_location
    .toLowerCase()
    .split(" ")
    .join("");

  const castleFeeOfDestination = JSON.parse(
    window.localStorage.getItem("all_castle_data")
  ).filter((item) => item.value === destination_location_toLowercase)[0].price;

  const initialFare = 0;

  const total_cost_of_onward_journey = user_selected_onward_journey.path
    .map((fare) => Number(initialFare) + Number(fare.routefare))
    .reduce((a, b) => a + b, 0);

  const total_cost_of_return_journey = user_selected_return_journey.path
    .map((fare) => Number(initialFare) + Number(fare.routefare))
    .reduce((a, b) => a + b, 0);

  const travel_cost_per_person =
    total_cost_of_onward_journey + total_cost_of_return_journey;

  const total_cost_of_journey = (
    (travel_cost_per_person + Number(castleFeeOfDestination)) *
    Number(JSON.parse(window.localStorage.getItem("people")))
  ).toFixed(2);

  return (
    <div className="mx-2 sm:mx-20 sm:px-0 px-1 my-10">
      <div className="ml-4 sm:ml-7 justify-center mb-5">
        <h1 className="text-3xl font-bold">Print Itinerary &rarr;</h1>
      </div>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 sm:gap-x-2 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-4 mx-4 sm:mx-8">
        <div>
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            <span className="font-bold text-sm text-orange-600">onward</span>{" "}
            journey from {""}
            <span className="font-bold text-sm text-teal-600">
              {" "}
              {user_selected_onward_journey.path[0].routesrc}
            </span>{" "}
            to{" "}
            <span className="font-bold text-sm text-violet-600">
              {" "}
              {
                user_selected_onward_journey.path[
                  user_selected_onward_journey.path.length - 1
                ].routedest
              }
            </span>
          </h2>
          <div className="group relative border border-gray-200 rounded-lg flex flex-col overflow-hidden">
            <div className="p-3 space-y-2 flex flex-col bg-emerald-800 text-slate-50 border border-emerald-800 ">
              <div className="grid grid-cols-3">
                <p className="place-self-start sm:place-self-end font-bold">
                  {user_selected_onward_journey.journeystarttime.slice(0, 2) +
                    ":" +
                    user_selected_onward_journey.journeystarttime.slice(2, 4)}
                </p>
                <p className="place-self-center">&rarr;</p>
                <p className="place-self-end sm:place-self-start font-bold">
                  {user_selected_onward_journey.journeyendtime.slice(0, 2) +
                    ":" +
                    user_selected_onward_journey.journeyendtime.slice(2, 4)}
                </p>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 text-lg m-4">
                <ul className="flex flex-col space-y-2 mx-auto">
                  {user_selected_onward_journey.path.map((eachPath) => (
                    <div key={eachPath.pathid}>
                      <li className="flex items-center" key={eachPath.pathid}>
                        <GiBusStop className="h-8 w-8 text-gray-700" />
                        <span className="ml-3">{eachPath.routesrc}</span>
                        <span className="ml-3 text-sm">
                          {eachPath.routestarttime.slice(0, 2) +
                            ":" +
                            eachPath.routestarttime.slice(2, 4)}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="ml-2">&darr;</span>
                      </li>
                      <li className="flex items-center">
                        {eachPath.routeserviceprovider.toLowerCase() ===
                        "walk" ? (
                          <FaWalking className="h-8 w-8 text-gray-700" />
                        ) : (
                          <FaBus className="h-8 w-8 text-gray-700" />
                        )}
                        <span className="ml-3 font-semibold">
                          {eachPath.routename}
                        </span>
                        {eachPath.routeserviceprovider.toLowerCase() !==
                        "walk" ? (
                          <span className="ml-1 text-sm text-violet-600 uppercase">
                            {eachPath.routeserviceprovider}
                          </span>
                        ) : null}
                      </li>
                      <li className="flex items-center">
                        <span className="ml-2">&darr;</span>
                      </li>
                      <li className="flex items-center">
                        <GiBusStop className="h-8 w-8 text-gray-700" />
                        <span className="ml-3">{eachPath.routedest}</span>
                        <span className="ml-3 text-sm">
                          {eachPath.routeendtime.slice(0, 2) +
                            ":" +
                            eachPath.routeendtime.slice(2, 4)}
                        </span>
                      </li>
                      {user_selected_onward_journey.path.length - 1 >=
                      eachPath.pathid ? (
                        <hr className="border-violet-500" />
                      ) : null}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            <span className="font-bold text-sm text-orange-600">return</span>{" "}
            journey from {""}
            <span className="font-bold text-sm text-violet-600">
              {" "}
              {user_selected_return_journey.path[0].routesrc}
            </span>{" "}
            to{" "}
            <span className="font-bold text-sm text-teal-600">
              {" "}
              {
                user_selected_return_journey.path[
                  user_selected_return_journey.path.length - 1
                ].routedest
              }
            </span>
          </h2>
          <div className="group relative border border-gray-200 rounded-lg flex flex-col overflow-hidden">
            <div className="p-3 space-y-2 flex flex-col bg-amber-700 text-slate-50 border border-amber-700 ">
              <div className="grid grid-cols-3">
                <p className="place-self-start sm:place-self-end font-bold">
                  {user_selected_return_journey.journeystarttime.slice(0, 2) +
                    ":" +
                    user_selected_return_journey.journeystarttime.slice(2, 4)}
                </p>
                <p className="place-self-center">&rarr;</p>
                <p className="place-self-end sm:place-self-start font-bold">
                  {user_selected_return_journey.journeyendtime.slice(0, 2) +
                    ":" +
                    user_selected_return_journey.journeyendtime.slice(2, 4)}
                </p>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 text-lg m-4">
                <ul className="flex flex-col space-y-2 mx-auto">
                  {user_selected_return_journey.path.map((eachPath) => (
                    <div key={eachPath.pathid}>
                      <li className="flex items-center" key={eachPath.pathid}>
                        <GiBusStop className="h-8 w-8 text-gray-700" />
                        <span className="ml-3">{eachPath.routesrc}</span>
                        <span className="ml-3 text-sm">
                          {eachPath.routestarttime.slice(0, 2) +
                            ":" +
                            eachPath.routestarttime.slice(2, 4)}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="ml-2">&darr;</span>
                      </li>
                      <li className="flex items-center">
                        {eachPath.routeserviceprovider.toLowerCase() ===
                        "walk" ? (
                          <FaWalking className="h-8 w-8 text-gray-700" />
                        ) : (
                          <FaBus className="h-8 w-8 text-gray-700" />
                        )}
                        <span className="ml-3 font-semibold">
                          {eachPath.routename}
                        </span>
                        {eachPath.routeserviceprovider.toLowerCase() !==
                        "walk" ? (
                          <span className="ml-1 text-sm text-violet-600 uppercase">
                            {eachPath.routeserviceprovider}
                          </span>
                        ) : null}
                      </li>
                      <li className="flex items-center">
                        <span className="ml-2">&darr;</span>
                      </li>
                      <li className="flex items-center">
                        <GiBusStop className="h-8 w-8 text-gray-700" />
                        <span className="ml-3">{eachPath.routedest}</span>
                        <span className="ml-3 text-sm">
                          {eachPath.routeendtime.slice(0, 2) +
                            ":" +
                            eachPath.routeendtime.slice(2, 4)}
                        </span>
                      </li>
                      {user_selected_return_journey.path.length - 1 >=
                      eachPath.pathid ? (
                        <hr className="border-violet-500" />
                      ) : null}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 ml-6">
        <h1 className="text-3xl font-bold mx-auto">
          Total Journey Cost &rarr; &#163;
          {total_cost_of_journey} for{" "}
          {JSON.parse(window.localStorage.getItem("people"))} people
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
          <div className="mt-3">
            <div className="flex rounded-md">
              <div className="bg-rose-600 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                Travel
              </div>
              <div className="flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
                <div className=" px-4 py-2 text-sm">
                  <p className="text-gray-500">
                    Travel cost per person: &#163;
                    {travel_cost_per_person.toFixed(2)}
                  </p>
                  <p className="text-gray-900 font-medium hover:text-rose-800">
                    Total Travel Cost for{" "}
                    {JSON.parse(window.localStorage.getItem("people"))}{" "}
                    traveller(s): &#163;
                    {(
                      travel_cost_per_person *
                      parseInt(
                        JSON.parse(window.localStorage.getItem("people")),
                        10
                      )
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex rounded-md">
              <div className="bg-fuchsia-600 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                Castle
              </div>
              <div className=" flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
                <div className=" px-4 py-2 text-sm">
                  <p className="text-gray-500">
                    Castle entry ticket per person: &#163;
                    {castleFeeOfDestination}
                  </p>
                  <p className="text-gray-900 font-medium hover:text-fuchsia-800">
                    Total Travel Cost for{" "}
                    {JSON.parse(window.localStorage.getItem("people"))}{" "}
                    travellers: &#163;
                    {castleFeeOfDestination *
                      parseInt(
                        JSON.parse(window.localStorage.getItem("people")),
                        10
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-items-center text-center mb-24 mt-24">
        <button
          onClick={() => {
            window.localStorage.setItem("usr_onward_jr", "");
            window.localStorage.setItem("usr_return_jr", "");
            window.localStorage.setItem("srcselected", "");
            window.localStorage.setItem("destselected", "");
            window.localStorage.setItem("date", "");
            window.localStorage.setItem("time", "");
            window.localStorage.setItem("people", "");
            navigate("/");
          }}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 w-80 text-center mx-auto justify-items-center justify-center"
        >
          Go Back Home
          <HomeIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default PrintItinerary;
