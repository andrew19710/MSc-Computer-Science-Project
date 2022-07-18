// @ts-check

import { people, references } from "../data/locationnames";

const About = () => {
  return (
    <>
      <div className="mx-2 sm:mx-20 my-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto justify-center">
            <h1 className="text-xl font-semibold text-gray-900 mx-auto">
              A bus scheduling website built as a part of Software Engineering
              and Team Project - CSC8019 @ Newcastle University, UK.
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Frontend - Built using React.js, Tailwind CSS, and hosted on
              Netlify.
              <br />
              Backend &amp; Database - Built using Node.js (Express.js), MySQL,
              and hosted on Heroku.
            </p>
          </div>
          <br />
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Team 11</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the teammates who contributed to this project.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Contribution
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {people.map((person) => (
                        <tr key={person.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-contain"
                                  src={person.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {person.name}
                                </div>
                                <div className="text-gray-500">
                                  {person.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{person.title}</div>
                            <div className="text-gray-500">
                              {person.contribution}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 sm:mx-20 my-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <br />
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                References
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the references to images and text used in this
                project.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">URL</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {references.map((reference) => (
                        <tr key={reference.name}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                {reference.image && (
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={reference.image}
                                    alt={reference.name}
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {reference.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {reference.description}
                            </div>
                            <div className="text-gray-500">
                              {reference.moreinfo}
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href={reference.websiteUrl}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Website Link
                              <span className="sr-only">
                                , {reference.name}
                              </span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
