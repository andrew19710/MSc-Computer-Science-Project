// @ts-check
import { useState } from "react";
import { sourcelocations, destinationlocations } from "../data/locationnames.js";

const SourceAndDestination = () => {
  const [srcselected, setSrcselected] = useState(sourcelocations[0].value);
  const [destselected, setDestselected] = useState(destinationlocations[0].value);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [people, setPeople] = useState(1);

  const handleSrcChange = (event) => {
    setSrcselected(event.target.value);
  };

  const handleDestChange = (event) => {
    setDestselected(event.target.value);
  };

  const handleDateChange = (event) => {
    const dateCheck = new Date(event.target.value);
    if (destselected === "aucklandcastle" && (dateCheck.getDay() === 1 || dateCheck.getDay() === 2)) {
      window.alert("Auckland Castle is closed on Mondays and Tuesdays");
      window.location.reload();
    } else {
      setDate(event.target.value);
    }
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handlePeopleChange = (event) => {
    setPeople(parseInt(event.target.value, 10));
  };

  const pageChangeToShowJourney = () => {
    const localStorage = window.localStorage;
    localStorage.setItem("srcselected", JSON.stringify(srcselected));
    localStorage.setItem("destselected", JSON.stringify(destselected));
    localStorage.setItem("date", JSON.stringify(String(date)));
    localStorage.setItem("time", JSON.stringify(String(time)));
    localStorage.setItem("people", JSON.stringify(String(people)));
    window.location.href = "/journey";
  };

  const handleSubmitButtonChange = (event) => {
    event.preventDefault();
    if (!srcselected || !destselected || !date || !time || !people) {
      window.alert("Please fill all the fields");
    } else {
      handleSrcChange(event);
      handleDestChange(event);
      handleDateChange(event);
      handleTimeChange(event);
      handlePeopleChange(event);
      pageChangeToShowJourney();
    }
    console.log({ srcselected, destselected, date, time, people });
  };


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div className="mt-6 grid-cols-1 gap-y-6 gap-x-4">
            <form className="space-y-8 divide-y divide-gray-200 mx-5 bg-slate-100 px-10 py-10 rounded-lg shadow-md">
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="">
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                        Travelling from (Source):
                      </label>
                      <div className="mt-1">
                        <select
                          onChange={handleSrcChange}
                          id="source"
                          name="source"
                          aria-label="source"
                          autoComplete="source-name"
                          required
                          value={srcselected}
                          className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          {sourcelocations.map((eachsource) => (
                            <option className="whitespace-pre-line" key={eachsource.id} value={eachsource.value}>{eachsource.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                        Travelling to (Destination):
                      </label>
                      <div className="mt-1">
                        <select
                          onChange={handleDestChange}
                          id="destination"
                          name="destination"
                          autoComplete="destination-name"
                          required
                          value={destselected}
                          className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          {destinationlocations.map((eachdestination) => (
                            <option className="whitespace-pre" key={eachdestination.id} value={eachdestination.value}>{eachdestination.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="dateoftravel" className="block text-sm font-medium text-gray-700">
                        Date of Travel:
                      </label>
                      <div className="mt-1">
                        <input
                          required
                          onChange={handleDateChange}
                          className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          type="date" id="dateoftravel" name="dateoftravel"
                          min={new Date().toISOString().substring(0, 10)}
                          max={new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() + 1,
                            new Date().getDate()
                          ).toISOString().substring(0, 10)} />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="timeoftravel" className="block text-sm font-medium text-gray-700">
                        Time of Travel:
                      </label>
                      <div className="mt-1">
                        <input
                          required
                          aria-label="time"
                          className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          type="time" id="timeoftravel"
                          name="timeoftravel"
                          min="07:00"
                          max="14:30"
                          onChange={handleTimeChange}
                          step="3600" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="numberofpeople" className="block text-sm font-medium text-gray-700">
                        No. of Travellers:
                      </label>
                      <div className="mt-1">
                        <select
                          onChange={handlePeopleChange}
                          id="numofpeople"
                          name="numofpeople"
                          aria-label="numofpeople"
                          autoComplete="numofpeople"
                          required
                          value={people}
                          className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option className="whitespace-pre-line" value="1">1</option>
                          <option className="whitespace-pre-line" value="2">2</option>
                          <option className="whitespace-pre-line" value="3">3</option>
                          <option className="whitespace-pre-line" value="4">4</option>
                          <option className="whitespace-pre-line" value="5">5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmitButtonChange}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Check buses
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="mt-6 grid-cols-1 gap-y-6 gap-x-4">
            <div className="space-y-8 divide-gray-200 mx-5 bg-violet-100 rounded-lg shadow-md">
              {/* <img src={sourcelocations[0].srcImage} alt="source" className="w-full h-80 rounded-lg" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SourceAndDestination;