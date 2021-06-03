import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { getSubs, createSub, removeSub } from "../../../functions/sub";

import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
//flipmove
import FlipMove from "react-flip-move";

// import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import NativeSelect from "@material-ui/core/NativeSelect";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

function CreateSub() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  //search
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);
  //load categories
  function loadCategories() {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  }

  function loadSubs() {
    getSubs().then((s) => {
      setSubs(s.data);
    });
  }
  //create categories
  function handleSubmit(e) {
    e.preventDefault();

    createSub({ name, parent }, user.token)
      .then((res) => {
        toast.dark(`${res.data.name} is created`);
        loadSubs();
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
      removeSub(slug, user.token)
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
            <AdminNav />

            <div class="col-md-9 col-sm-7">
              <h1>Sub Category</h1>
              <div class="content-page">
                <FormControl className="form-control">
                  <InputLabel htmlFor="uncontrolled-native">Name</InputLabel>

                  <NativeSelect onChange={(e) => setParent(e.target.value)}>
                    <option>Select Category</option>
                    {categories.length > 0 &&
                      categories.map((c) => {
                        return (
                          <option value={c._id} key={c._id}>
                            {c.name}
                          </option>
                        );
                      })}
                  </NativeSelect>
                </FormControl>
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
                    Add Sub Category
                  </button>
                </form>{" "}
                <hr />
                <label>
                  <h4>Search Sub Categories</h4>
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
                {subs.length === 0 ? (
                  <p className="text-center" style={{ margin: "30px" }}>
                    All sub categories showed up here
                  </p>
                ) : null}
                {subs.filter(searched(keyword)).map((c) => {
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

                          <Link to={`/admin/sub/${c.slug}`}>
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

export default CreateSub;
