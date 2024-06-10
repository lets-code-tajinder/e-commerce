import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { httpGet, httpPost } from "../../utils/http";
import { API_URLS } from "../../configs/urls";

const defaultData = {
  categoryId: "",
  productName: "",
  productDescription: "",
  productPrice: "",
  productImage: null,
  displayOrder: "",
  status: "",
  productQuantity: "",
  special: false,
};

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    ...defaultData,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await httpGet(API_URLS.FETCH_CATEGORIES);

        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, productImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    const params = {
      ...formData,
      productImage: formData.productImage.name,
    };

    try {
      const res = await httpPost(API_URLS.ADD_PRODUCT, params);

      if (res.msg) {
        await httpPost(API_URLS.UPLOAD_IMAGE, formDataToSubmit);

        setFormData({ ...defaultData });
      }

      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.categoryId) errors.push("Category is required");
    if (!formData.productName) errors.push("Product Name is required");
    if (!formData.productDescription)
      errors.push("Product Description is required");
    if (!formData.productPrice) errors.push("Product Price is required");
    if (!formData.productImage) errors.push("Product Image is required");
    if (!formData.displayOrder) errors.push("Display Order is required");
    if (!formData.status) errors.push("Status is required");
    if (!formData.productQuantity) errors.push("Product Quantity is required");

    return errors;
  };

  return (
    <Container>
      <h1>Add Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="categoryId" className="mb-3">
          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="productName">
          <Form.Label column sm={2}>
            Product Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="productDescription">
          <Form.Label column sm={2}>
            Product Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="productPrice">
          <Form.Label column sm={2}>
            Product Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="productImage">
          <Form.Label column sm={2}>
            Product Image
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              name="productImage"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ marginTop: "10px", maxWidth: "200px" }}
              />
            )}
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="displayOrder">
          <Form.Label column sm={2}>
            Display Order
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="status">
          <Form.Label column sm={2}>
            Status
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="productQuantity">
          <Form.Label column sm={2}>
            Product Quantity
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="special">
          <Form.Label column sm={2}>
            Special
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              name="special"
              checked={formData.special}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Button disabled={validateForm().length > 0} type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
