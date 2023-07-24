import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const [searchInput, setSearchInput] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (searchInput !== '') {
      props.getData(searchInput);
    }
  }

  function handleInputChange(event) {
    setSearchInput(event.target.value);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          WordHive
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="/main">
                  Main
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="/dictionary">
                  Dictionary
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="/about">
                  About
                </Link>
              </li>
            </ul>

          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
