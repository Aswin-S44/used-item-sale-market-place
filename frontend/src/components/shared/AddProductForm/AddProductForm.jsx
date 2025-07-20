import React, { useEffect, useState } from "react";
import "./AddProductForm.css";
import {
  FiTag,
  FiDollarSign,
  FiType,
  FiPackage,
  FiMapPin,
  FiCheckSquare,
  FiUploadCloud,
  FiX,
  FiPlus,
} from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { STATUS_CREATED, STATUS_OK } from "../../../constants/httpStatusCodes";
import {
  PRODUCT_CATEGORY_TYPES,
  PRODUCT_CONDITION_TYPES,
} from "../../../constants/appConstants";
import { AddProduct } from "../../../api/dealer/dealerApi";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../api/common/commonApis";

function AddProductForm({ title, mode = "add" }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    condition: "",
    usedDuration: "",
    askingRate: "",
    isNegotiable: false,
    images: [],
    description: "",
    location: "",
    warrantyAvailable: false,
    features: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [initialLoad, setInitialLoad] = useState(mode === "edit");

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await getProductById(id);
          if (response.status === STATUS_OK) {
            const product = response?.data?.product;

            setImages(product.images || []);

            const previews = (product.images || []).map((url) => ({
              file: null,
              preview: url,
            }));

            setFormData({
              name: product.name || "",
              category: product.category || "",
              condition: product.condition || "",
              usedDuration: product.usedDuration || "",
              askingRate: product.askingRate || "",
              isNegotiable: product.isNegotiable || false,
              images: [],
              description: product.description || "",
              location: product.location || "",
              warrantyAvailable: product.warrantyAvailable || false,
              features: product.features || [],
            });

            setImagePreviews(previews);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
          setInitialLoad(false);
        }
      };

      fetchProduct();
    }
  }, [id, mode]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (!formData.askingRate) newErrors.askingRate = "Asking Price is required";
    if (!formData.description.trim())
      newErrors.description = "Detailed Description is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";
    if (formData.features.length === 0)
      newErrors.features = "At least one feature is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Use the file directly, not file.originFileObj
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (fileList) => {
    const base64Images = await Promise.all(fileList.map(convertToBase64));
    setImages(base64Images);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleImageUpload(files);
    const newImageObjects = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setImagePreviews((prev) => [...prev, ...newImageObjects]);
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleFeatureKeyDown = (e) => {
    if (e.key === "Enter" && currentFeature.trim() !== "") {
      e.preventDefault();
      if (!formData.features.includes(currentFeature.trim())) {
        setFormData((prev) => ({
          ...prev,
          features: [...prev.features, currentFeature.trim()],
        }));
        if (errors.features) {
          setErrors((prev) => ({ ...prev, features: "" }));
        }
      }
      setCurrentFeature("");
    }
  };

  const removeFeature = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      formData.images = images;
      const resp = await AddProduct(formData);
      setLoading(false);
      if (resp.status === STATUS_CREATED) {
        alert("Product added");
      }
    }
  };

  return (
    <div className="add-product-page">
      <div className="form-container">
        <header className="form-main-header">
          <a href="/profile">
            <IoIosArrowBack className="mt-2" />
            Back
          </a>
          <h2>{title}</h2>
          <p>Bring your product to the marketplace with a stunning listing.</p>
        </header>

        <form onSubmit={handleSubmit} className="product-form-content">
          <section className="form-section">
            <div className="section-header">
              <h3>Basic Details</h3>
            </div>
            <div className="input-grid">
              <div className="form-group span-2">
                <label htmlFor="name">Product Title</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Apple MacBook Pro 16-inch M1"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category.toLowerCase()}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select category...
                  </option>
                  {Object.values(PRODUCT_CATEGORY_TYPES).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="error-message">{errors.category}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select condition...
                  </option>
                  {Object.values(PRODUCT_CONDITION_TYPES).map((con) => (
                    <option key={con} value={con}>
                      {con}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <span className="error-message">{errors.condition}</span>
                )}
              </div>
              {formData.condition === "Used" && (
                <div className="form-group span-2 fade-in">
                  <label htmlFor="usedDuration">Usage Duration</label>
                  <input
                    type="text"
                    id="usedDuration"
                    name="usedDuration"
                    value={formData.usedDuration}
                    onChange={handleChange}
                    placeholder="e.g., Approx. 2 years"
                  />
                </div>
              )}
            </div>
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Pricing & Description</h3>
            </div>
            <div className="input-grid">
              <div className="form-group">
                <label htmlFor="askingRate">Asking Price</label>
                <div className="input-with-icon">
                  <span>$</span>
                  <input
                    type="number"
                    id="askingRate"
                    name="askingRate"
                    value={formData.askingRate}
                    onChange={handleChange}
                    placeholder="2500"
                  />
                </div>
                {errors.askingRate && (
                  <span className="error-message">{errors.askingRate}</span>
                )}
              </div>
              <div className="form-group checkbox-container">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="isNegotiable"
                    name="isNegotiable"
                    checked={formData.isNegotiable}
                    onChange={handleChange}
                  />
                  <label htmlFor="isNegotiable">Price is Negotiable</label>
                </div>
              </div>
              <div className="form-group span-2">
                <label htmlFor="description">Detailed Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe key features, condition, and any included accessories..."
                ></textarea>
                {errors.description && (
                  <span className="error-message">{errors.description}</span>
                )}
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Media & Features</h3>
            </div>
            <div className="form-group span-2">
              <label>Product Photos</label>
              <div className="image-uploader-container">
                <input
                  type="file"
                  id="images"
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                />
                <label htmlFor="images" className="uploader-box">
                  <div className="uploader-icon">
                    <FiUploadCloud />
                  </div>
                  <p>
                    <b>Click to upload</b> or drag and drop
                  </p>
                  <small>High-quality images get more views</small>
                </label>
                <div className="image-previews-grid">
                  {imagePreviews.map((img, index) => (
                    <div key={index} className="preview-item">
                      <img src={img.preview} alt="preview" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-btn"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
                {errors.images && (
                  <span className="error-message">{errors.images}</span>
                )}
              </div>
            </div>
            <div className="form-group span-2">
              <label htmlFor="features">Key Features (Tags)</label>
              <div className="feature-input-wrapper">
                {formData.features.map((feature, index) => (
                  <div key={index} className="feature-tag">
                    {feature}
                    <button type="button" onClick={() => removeFeature(index)}>
                      <FiX />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  className="feature-input"
                  value={currentFeature}
                  onChange={(e) => setCurrentFeature(e.target.value)}
                  onKeyDown={handleFeatureKeyDown}
                  placeholder="Add a feature & press Enter"
                />
              </div>
              {errors.features && (
                <span className="error-message">{errors.features}</span>
              )}
            </div>
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Logistics</h3>
            </div>
            <div className="input-grid">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA"
                />
                {errors.location && (
                  <span className="error-message">{errors.location}</span>
                )}
              </div>
              <div className="form-group checkbox-container">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="warrantyAvailable"
                    name="warrantyAvailable"
                    checked={formData.warrantyAvailable}
                    onChange={handleChange}
                  />
                  <label htmlFor="warrantyAvailable">Warranty Included</label>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>

      <aside className="preview-sidebar">
        <div className="preview-card-sticky">
          <h4>Live Preview</h4>
          <div className="live-product-card">
            <div className="live-image-placeholder">
              {imagePreviews.length > 0 ? (
                <img src={imagePreviews[0].preview} alt="main preview" />
              ) : (
                <FiPackage />
              )}
            </div>
            <div className="live-info">
              <h5 className="live-title">{formData.name || "Product Title"}</h5>
              <p className="live-price">
                {formData.askingRate
                  ? `${Number(formData.askingRate).toLocaleString()}`
                  : "$0"}
              </p>
              <span className="live-category">
                {formData.category || "Category"}
              </span>
              <p className="live-location mt-2">
                {formData.location ? (
                  <>
                    <FaLocationDot /> {formData.location}
                  </>
                ) : (
                  "_"
                )}
              </p>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary">
              Discard
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-primary"
            >
              <FiPlus /> {loading ? <>Please wait</> : <>Post Listing</>}
            </button>
          </div>
        </div>
      </aside>

      <footer className="mobile-footer-actions">
        <button type="button" className="btn-secondary">
          Discard
        </button>
        <button type="submit" onClick={handleSubmit} className="btn-primary">
          <FiPlus /> Post Listing
        </button>
      </footer>
    </div>
  );
}

export default AddProductForm;
