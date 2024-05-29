import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Search from "./Search";

const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchRedirect, setSearchRedirect] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      // User is logged in
      setRedirect(false);
    } else {
      setRedirect(true);
    }
  }, []);

  const logout = () => {
    localStorage.setItem("uid", "");
    localStorage.clear();
    setRedirect(true);
    alert("logout Successfully");
  };

  const addForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchRedirect(true);
  };

  return (
    <>
      {searchRedirect ? (
        <div>
          <Search />
        </div>
      ) : (
        <div>
          <div
            className="py-2"
            style={{ backgroundColor: "#222121", color: "white" }}
          >
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <h1>ENEST</h1>
                    <p>THE BIGGEST CHOICE OF THE WEB</p>
                  </div>
                  <div className="col-md-4">
                    {redirect ? (
                      <Link to="/create-account">
                        <input
                          type="button"
                          className="login_button"
                          value="Log In"
                        />
                      </Link>
                    ) : (
                      <input
                        type="button"
                        className="login_button"
                        value="Log Out"
                        onClick={logout}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid nav1">
              <div className="container">
                <Navbar expand="lg">
                  <Navbar.Brand className="m-0"></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto float-start col-md-8">
                      <Nav.Link className="list_color" href="/">
                        HOME
                      </Nav.Link>
                      <Nav.Link className="list_color" href="/new-products">
                        NEW PRODUCTS
                      </Nav.Link>
                      <Nav.Link className="list_color" href="/special-products">
                        SPECIAL
                      </Nav.Link>
                      <Nav.Link className="list_color" href="/all-products">
                        ALL PRODUCTS
                      </Nav.Link>
                      <Nav.Link className="list_color" href="/contact">
                        CONTACT
                      </Nav.Link>
                    </Nav>
                    <Form
                      className="d-flex float-end search_form"
                      onSubmit={addForm}
                    >
                      <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2 search_input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Link to={`/search-products/${search}`}>
                        <Button
                          type="submit"
                          variant="outline-success"
                          className="search_button"
                        >
                          Search
                        </Button>
                      </Link>
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
