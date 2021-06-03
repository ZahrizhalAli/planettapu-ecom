import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { updateCategory, getCategory } from "../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CategoryUpdate({ match, history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  useEffect(() => {
    getCategory(match.params.slug).then((c) => {
      setName(c.data.name);
    });
  }, [match.params.slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    //
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        toast.dark("Category updated.");
        setName("");
        history.push("/admin/category");
      })
      .catch((err) => {
        toast.error("Category update failed");
        history.push("/admin/category");
      });
  }
  return (
    <>
      <div class="main">
        <div class="container-fluid">
          {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
          <div class="row margin-bottom-40">
            {/* <!-- USER NAV --> */}
            <AdminNav />

            <div class="col-md-9 col-sm-7">
              <h1>Category</h1>
              <div class="content-page">
                {" "}
                <form class="form-signin" onSubmit={handleSubmit}>
                  <label for="inputEmail">Update Category</label>
                  <input
                    required
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
                  <button class="btn btn-md btn-signin btn-block" type="submit">
                    Update Category
                  </button>
                </form>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryUpdate;
