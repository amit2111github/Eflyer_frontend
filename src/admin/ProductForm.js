import React from 'react';

const ProductForm = React.forwardRef(({ values, handleChange, handleSubmit }, ref) => {
	const { name, myRef, description, price, stock, categories, category } = values;
	return (
		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<form>
					<div className="form-group">
						<p className="font-weight-bold h4">Name</p>
						<input
							value={name}
							type="text"
							name="name"
							className="form-control"
							placeholder="Name"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<p className="font-weight-bold h4">Description</p>
						<textarea
							value={description}
							type="text"
							name="description"
							className="form-control"
							placeholder="Description"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<p className="font-weight-bold h4">Price</p>
						<input
							value={price}
							onChange={handleChange}
							type="number"
							name="price"
							className="form-control"
							placeholder="Price"
						/>
					</div>
					<div className="form-group">
						<p className="font-weight-bold h4">Category</p>
						<select
							name="category"
							className="form-control"
							placeholder="Category"
							onChange={handleChange}
							value={category}
						>
							<option>Select</option>
							{categories.map((cat, index) => (
								<option key={index} value={cat._id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
					<div className="form-group">
						<p className="font-weight-bold h4">Stock</p>
						<input
							value={stock}
							onChange={handleChange}
							type="number"
							name="stock"
							className="form-control"
							placeholder="Quantity"
						/>
					</div>
					<div className="form-group">
						<p className="font-weight-bold h4">Select a photo</p>
						<input
							className="form-control-file"
							type="file"
							name="photo"
							accept="image"
							placeholder="chose a file"
							onChange={handleChange}
						/>
					</div>
					<button ref={ref} type="submit" className="createProdct rounded" onClick={handleSubmit}>
						Create Product
					</button>
				</form>
			</div>
		</div>
	);
});
export default ProductForm;
