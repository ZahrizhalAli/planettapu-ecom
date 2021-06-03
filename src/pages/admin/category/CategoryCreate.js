import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import {
  getCategories,
  createCategory,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
//flipmove
import FlipMove from "react-flip-move";

function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  //search
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    loadCategories();
  }, []);
  //load categories
  function loadCategories() {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  }
  //create categories
  function handleSubmit(e) {
    e.preventDefault();

    createCategory({ name }, user.token)
      .then((res) => {
        toast.dark(`${res.data.name} is created`);
        loadCategories();
        setName("");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data);
          setName("");
        }
      });
  }

  //remove categories
  async function handleRemove(slug) {
    if (window.confirm("Are you sure want to delete? ")) {
      removeCategory(slug, user.token)
        .then(() => {
          toast.dark("Category removed");
          loadCategories();
        })
        .catch((err) => {
          toast.error("Remove failed");
        });
    }
  }

  //search categories
  const searched = (keyword) => (c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase());
  return (
    <>
      <div class="main">
        <div class="container-fluid">
          {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
          <div class="row margin-bottom-40">
            {/* <!-- USER NAV --> */}
            <div className="col-md-3">
              <AdminNav />
            </div>
            <div class="col-md-9 ">
              <h1>Category</h1>
              <div class="content-page">
                {" "}
                <form class="form-signin" onSubmit={handleSubmit}>
                  <label for="inputEmail">New Category</label>
                  <input
                    size="50"
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Enter new Category"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    autofocus
                  />
                  <button
                    class="btn btn-md btn-outline-dark btn-category"
                    type="submit"
                  >
                    Add Category
                  </button>
                </form>{" "}
                <hr />
                <label>
                  <h4>Search Categories</h4>
                </label>
                <input
                  type="search"
                  className="form-control filter-categories"
                  value={keyword}
                  placeholder="Search here"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
                {categories.length === 0 ? (
                  <p className="text-center" style={{ margin: "30px" }}>
                    All categories showed up here
                  </p>
                ) : null}
                {categories.filter(searched(keyword)).map((c) => {
                  return (
                    <>
                      <FlipMove className="flip-wrapper">
                        <div key={c._id} className="alert alert-secondary">
                          {c.name}

                          <span
                            className="btn btn-sm float-right"
                            onClick={() => {
                              handleRemove(c.slug);
                            }}
                          >
                            <DeleteOutlined />
                          </span>

                          <Link to={`/admin/category/${c.slug}`}>
                            <span className="btn btn-sm float-right">
                              <EditOutlined />
                            </span>
                          </Link>
                        </div>
                      </FlipMove>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCreate;
