import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { updateSub, getSub } from "../../../functions/sub";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function UpdateSub({ match, history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  useEffect(() => {
    getSub(match.params.slug).then((c) => {
      setName(c.data.name);
    });
  }, [match.params.slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    //
    updateSub(match.params.slug, { name: name }, user.token)
      .then((res) => {
        toast.dark("Sub Category updated.");
        setName("");
        history.push("/admin/sub");
      })
      .catch((err) => {
        toast.error("Sub Category update failed");
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
              <h1>Sub Category</h1>
              <div class="content-page">
                {" "}
                <form class="form-signin" onSubmit={handleSubmit}>
                  <label for="inputEmail">Update Sub Category</label>
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
                    Update Sub Category
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

export default UpdateSub;
