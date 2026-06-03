import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

function ShopPageHeader() {
  return (
    <div>
      {/* TOP TITLE BAR */}
      <div
  style={{
    backgroundColor: "#8a8373",
    padding: "30px 0",
    textAlign: "center",
    color: "black",
    fontSize: "28px",
    fontWeight: "500",
    width: "70%",
    margin: "0 auto", // ⭐ centers the div
  }}
>
  Shop Page
</div>

      {/* FILTER + SORT BAR */}
      <Container fluid style={{ padding: "20px 190px" }}>
        <Row className="align-items-center">
          <Col md={6} sm={12}>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Showing 1–9 of 18 results
            </p>
          </Col>

          <Col
            md={6}
            sm={12}
            className="d-flex justify-content-md-end mt-2 mt-md-0"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "14px" }}>Sort by:</span>

              <Form.Select
                style={{
                  width: "150px",
                  fontSize: "14px",
                }}
              >
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </Form.Select>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShopPageHeader;