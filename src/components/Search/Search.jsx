import React from "react";
import "./Search.css";
import { IoIosSearch } from "react-icons/io";
import { RiEqualizerFill } from "react-icons/ri";

export default function Search() {
  return (
    <>
      <div className="search">
        <h1>Inspections</h1>
        <div className="search-filter">
          <div className="search-box">
            <input placeholder="Search a BIN" type="text" />
            <IoIosSearch className="icon" />
          </div>
          <div className="filter-btn">
            <button>
              <RiEqualizerFill className="icon" /> Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
