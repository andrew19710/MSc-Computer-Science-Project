// @ts-check
import Card from "../components/Card";
import SourceAndDestination from "../components/SourceAndDestination";

const Home = () => {
  return (
    <>
      <div className="relative bg-white overflow-hidden pb-12">
        <main>
          <div>
            {/* Hero card */}
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 bg-gray-100" />
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      loading="lazy"
                      className="h-full w-full object-cover"
                      src="/images/castleimages/alnwick-castle-homepage.jpg"
                      alt="Alnwick Castle"
                    />
                    <div className="absolute inset-0 bg-slate-600 mix-blend-multiply" />
                  </div>
                  <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                      <span className="inline-block text-white">ABO</span>
                      <span className="inline-block text-orange-400">RDO</span>
                    </h1>
                    <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                      Team 11 welcomes you aboard!
                    </p>
                    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                      <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                        <a
                          href={"#allcastles"}
                          className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-orange-700 bg-white hover:bg-orange-50 sm:px-8"
                        >
                          Explore Castles
                        </a>
                        {/* <a
                          href="/"
                          className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 bg-opacity-90 hover:bg-opacity-70 sm:px-8"
                        >
                          Book Now
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 z-50">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 px-2">
                  Choose the perfect castle for you
                </h2>
                <p className="mt-3 mx-auto text-xl text-gray-500 sm:mt-5">
                  Choose Source, Destination, Date and Time to book your travel
                  (maximum 1 month in advance)
                </p>
              </div>
              <SourceAndDestination />
            </div>
          </div>
        </main>
      </div>
      <Card />
    </>
  );
};;

export default Home;
