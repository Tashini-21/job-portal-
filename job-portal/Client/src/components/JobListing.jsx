import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations, jobsData } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);
    const [showFilter, setShowFilter] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(jobsData);

    const jobsPerPage = 6;
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleLocationChange = (location) => {
        setSelectedLocations((prev) =>
            prev.includes(location)
                ? prev.filter((l) => l !== location)
                : [...prev, location]
        );
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Filtering logic based on selected filters
    useEffect(() => {
        let filtered = jobsData;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((job) =>
                selectedCategories.includes(job.category)
            );
        }

        if (selectedLocations.length > 0) {
            filtered = filtered.filter((job) =>
                selectedLocations.includes(job.location)
            );
        }

        if (isSearched) {
            if (searchFilter.title) {
                filtered = filtered.filter((job) =>
                    job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
                );
            }

            if (searchFilter.location) {
                filtered = filtered.filter((job) =>
                    job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
                );
            }
        }

        setFilteredJobs(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [selectedCategories, selectedLocations, searchFilter, isSearched]);

    return (
        <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white px-4">
                {isSearched && (searchFilter.title || searchFilter.location) && (
                    <>
                        <h3 className="font-medium text-lg mb-4">Current Search</h3>
                        <div className="mb-4 text-gray-600 flex flex-wrap gap-2">
                            {searchFilter.title && (
                                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                                    {searchFilter.title}
                                    <img
                                        onClick={() =>
                                            setSearchFilter((prev) => ({ ...prev, title: "" }))
                                        }
                                        className="cursor-pointer ml-2 w-4 h-4"
                                        src={assets.cross_icon}
                                        alt="Clear title filter"
                                    />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                                    {searchFilter.location}
                                    <img
                                        onClick={() =>
                                            setSearchFilter((prev) => ({ ...prev, location: "" }))
                                        }
                                        className="cursor-pointer ml-2 w-4 h-4"
                                        src={assets.cross_icon}
                                        alt="Clear location filter"
                                    />
                                </span>
                            )}
                            <button
                                onClick={() => setSearchFilter({ title: "", location: "" })}
                                className="text-sm text-blue-600 underline mt-2 ml-2"
                            >
                                Clear All
                            </button>
                        </div>
                    </>
                )}

                <button
                    className="px-6 py-1.5 rounded border border-gray-400 lg:hidden mb-4"
                    onClick={() => setShowFilter(!showFilter)}
                >
                    {showFilter ? "Close Filters" : "Show Filters"}
                </button>

                {/* Filters */}
                <div className={`space-y-10 ${showFilter ? "block" : "hidden"} lg:block`}>
                    <div>
                        <h4 className="font-medium text-lg py-4">Search by Categories</h4>
                        <ul className="space-y-4 text-gray-600">
                            {JobCategories.map((category, index) => (
                                <li className="flex gap-3 items-center" key={index}>
                                    <input
                                        id={`category-${index}`}
                                        className="scale-125"
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <label htmlFor={`category-${index}`}>{category}</label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-lg pt-4">Search by Location</h4>
                        <ul className="space-y-4 text-gray-600">
                            {JobLocations.map((location, index) => (
                                <li className="flex gap-3 items-center" key={index}>
                                    <input
                                        id={`location-${index}`}
                                        className="scale-125"
                                        type="checkbox"
                                        checked={selectedLocations.includes(location)}
                                        onChange={() => handleLocationChange(location)}
                                    />
                                    <label htmlFor={`location-${index}`}>{location}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                <h3 className="font-medium text-3xl py-2" id="job-list">Latest Jobs</h3>
                <p className="mb-8">Get Your Desired Job From Top Companies</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {paginatedJobs.length > 0 ? (
                        paginatedJobs.map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    ) : (
                        <p>No job listings available.</p>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center mt-8 gap-2">
                        <button
                            className="p-2 rounded border"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <img src={assets.left_arrow_icon} alt="Previous" className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1 rounded border ${currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-black"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="p-2 rounded border"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <img src={assets.right_arrow_icon} alt="Next" className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default JobListing;
