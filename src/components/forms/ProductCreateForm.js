import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

function ProductCreateForm({
  values,
  handleSubmit,
  handleChange,
  handleCategoryChange,
  showSubs,
  setValues,
  subOptions,
}) {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    colors,
    color,
  } = values;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please select</option>

            <option value="No">No</option>

            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Color</label>
          <select name="color" className="form-control" onChange={handleChange}>
            <option>Select colors</option>

            {colors.map((c) => {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Product Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCategoryChange}
          >
            <option>Pilih category</option>
            {categories.length > 0 &&
              categories.map((c) => {
                return (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                );
              })}
          </select>
        </div>
        {showSubs && (
          <div className="form-group">
            <label>Sub Categories</label>
            <Select
              mode="multiple"
              className="form-control"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length > 0 &&
                subOptions.map((s) => {
                  return (
                    <Option value={s._id} key={s._id}>
                      {s.name}
                    </Option>
                  );
                })}
            </Select>
          </div>
        )}

        <button className="btn btn-outline-dark">PUBLISH</button>
      </form>
    </>
  );
}

export default ProductCreateForm;
