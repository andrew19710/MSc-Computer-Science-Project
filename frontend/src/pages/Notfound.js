const Notfound = () => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 bg-gray-100" />
        <div className=" mx-auto sm:px-6 lg:px-8 pb-6">
          <div className="relative shadow-xl  sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                loading="lazy"
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1614706465379-623e26271e54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="Dead end"
              />
              <div className="absolute inset-0 bg-indigo-300 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="inline-block text-white">Are you </span>
                <span className="inline-block text-amber-500">...Lost ?</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-yellow-500 italic font-bold  sm:max-w-3xl"></p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                  <a
                    href="/"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-orange-700 bg-white hover:bg-orange-50 sm:px-8"
                  >
                    Go Back Home
                  </a>
                  <a
                    href="/"
                    // className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 bg-opacity-90 hover:bg-opacity-70 sm:px-8"
                  >
                    {/* Go Back To home */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
