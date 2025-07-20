import React from "react";
import AddProductForm from "../../components/shared/AddProductForm/AddProductForm";

function EditProductPage() {
  return (
    <div>
      <AddProductForm title={"Edit your Product"} mode={"edit"} />
    </div>
  );
}

export default EditProductPage;
