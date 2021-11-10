import React from 'react';

const UpdateCategoryForm = ({ handleChange, name, handleSubmit }) => (
	<div className="row">
		<div className="col-md-6 offset-sm-3 text-left">
			<form>
				<div className="form-group">
					<p className="font-weight-bold h4">Enter the Category</p>
					<input
						name="name"
						type="text"
						className="form-control my-3"
						autoFocus
						placeholder="For Ex. Summer"
						value={name}
						onChange={handleChange}
					/>
					<div class="addtoCart mt-4">
						<a onClick={handleSubmit} type="submit" onClick={handleSubmit}>
							Update Category
						</a>
					</div>
				</div>
			</form>
		</div>
	</div>
);
export default UpdateCategoryForm;
