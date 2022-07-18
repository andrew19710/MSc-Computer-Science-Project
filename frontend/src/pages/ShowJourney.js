// @ts-check
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import EachBusOnward from "../components/EachBusOnward";
import { sourcelocations, destinationlocations } from "../data/locationnames";
import EachBusReturn from "../components/EachBusReturn";

const ShowJourney = () => {
  function getDataFromLocalStorage() {
    const srcselected = JSON.parse(window.localStorage.getItem("srcselected"));
    const destselected = JSON.parse(
      window.localStorage.getItem("destselected")
    );
    const datefromlocalstorage = new Date(
      JSON.parse(window.localStorage.getItem("date"))
    );

    const datetoweekname = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
    })
      .format(datefromlocalstorage)
      .split(",")[0]
      .toLowerCase();

    const time = String(JSON.parse(window.localStorage.getItem("time")))
      .split(":")
      .join("");

    const people = JSON.parse(window.localStorage.getItem("people"));
    return { srcselected, destselected, datetoweekname, time, people };
  }

  const { srcselected, destselected, datetoweekname, time, people } =
    getDataFromLocalStorage();

  const [exploretimings, setExploretimings] = useState([]);
  const [returntimings, setReturntimings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let date;
  if (
    datetoweekname === "monday" ||
    datetoweekname === "tuesday" ||
    datetoweekname === "wednesday" ||
    datetoweekname === "thursday" ||
    datetoweekname === "friday"
  ) {
    date = "weekday";
  } else if (datetoweekname === "saturday") {
    date = "saturday";
  } else if (datetoweekname === "sunday") {
    date = "sunday";
  } else {
    date = "null";
  }

  const getUrlEndpoint = `/api/journey?srcselected=${srcselected}&destselected=${destselected}&date=${date}&time=${time}`;

  const sourceselectedbyuser = sourcelocations.find(
    (sourcevalue) => sourcevalue.value === srcselected
  ).name;

  const destselectedbyuser = destinationlocations.find(
    (destvalue) => destvalue.value === destselected
  ).name;

  useEffect(() => {
    const getInfo = async () => {
      await axios
        .get(`${getUrlEndpoint}`)
        .then((res) => {
          setExploretimings(res.data.checkTime_onward_time[0]);
          setReturntimings(res.data.checkTime_return_time[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getInfo();
  }, [getUrlEndpoint]);

  return (
    <>
      <div className="mx-6 my-2 sm:mx-28">
        <div className="flex justify-between flex-col">
          <div>
            <p className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium text-white bg-rose-800">
              Please select one onward and one return journey
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/");
              }}
              type="button"
              className="inline-flex items-center px-4 py-2 mt-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white mb-2 bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <ArrowCircleLeftIcon
                className="-ml-1 mr-3 h-5 w-5"
                aria-hidden="true"
              />
              Back to Home
            </button>
          </div>
        </div>
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Itinerary for{" "}
          <span className="font-bold text-sm text-orange-600">onward</span>{" "}
          journey from {""}
          <span className="font-bold text-sm text-emerald-600">
            {" "}
            {sourceselectedbyuser}
          </span>{" "}
          to{" "}
          <span className="font-bold text-sm text-violet-600">
            {" "}
            {destselectedbyuser}
          </span>
        </h2>
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Selected Day:{" "}
          <span className="font-bold text-sm text-blue-600">
            {datetoweekname}
          </span>{" "}
          &amp; Depart after time:{" "}
          <span className="font-bold text-sm text-blue-600">
            {time.slice(0, 2)}:{time.slice(2, 4)}
          </span>{" "}
          &amp; Number of travellers:{" "}
          <span className="font-bold text-sm text-blue-600">{people}</span>{" "}
        </h2>
        {!loading && exploretimings && exploretimings.length > 0 && (
          <EachBusOnward onwardbustiming={exploretimings} />
        )}
      </div>
      <div>
        <hr className="border-2 border-slate-700 mx-4 rounded-xl" />
      </div>
      <div className="mx-6 my-2 sm:mx-28">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Itinerary for{" "}
          <span className="font-bold text-sm text-orange-600">return</span>{" "}
          journey from {""}
          <span className="font-bold text-sm text-violet-600">
            {" "}
            {destselectedbyuser}
          </span>{" "}
          to{" "}
          <span className="font-bold text-sm text-emerald-600">
            {" "}
            {sourceselectedbyuser}
          </span>
        </h2>
        {!loading && returntimings && returntimings.length > 0 && (
          <EachBusReturn returnbustiming={returntimings} />
        )}
      </div>

      <div className="justify-items-center text-center mb-24">
        <button
          onClick={() => {
            if (
              !window.localStorage.getItem("usr_onward_jr") ||
              !window.localStorage.getItem("usr_return_jr")
            ) {
              alert("Please select both onward and return journey");
            } else {
              navigate("/print-itinerary");
            }
          }}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 w-80 text-center mx-auto justify-items-center justify-center"
        >
          Print Itinerary
          <ArrowCircleRightIcon
            className="ml-3 -mr-1 h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );
};

export default ShowJourney;
