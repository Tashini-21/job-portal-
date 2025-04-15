import React, { useState } from 'react';
import './Appbar.css';
import { JobCategories } from '../../assets/assets';

const Appbar = () => {
  const [active, setActive] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState(true);

  const handleClick = (index) => {
    if (index === 4) {
      setShowDropdown((prev) => !prev);
      setActive(index);
    } else {
      setShowDropdown(false);
      setActive(index);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowDropdown(true); // Keeps the dropdown open on selection
  };

  return (
    <div className='appbar'>
      <ul className='nav-list'>
        {["Home", "Contact Us", "About Us",].map((item, index) => (
          <li
            key={index}
            className={`nav-item ${active === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            {item}

          {item === "Job Categories" && showDropdown &&(
            <div className="dropdown-container">
            <ul className='dropdown-list'>
              {JobCategories.map((category, i) =>(
                <li 
                key={i} 
                className={`dropdown-item ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            </div>
          )}
          




          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appbar;
