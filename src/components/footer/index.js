import React from "react";
import "./footer.css";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="warning" className="text-center text-lg-start text-muted">
      <section className="justify-content-right justify-content-lg-between p-4 border-bottom">
        <div style={{color:"white", backgroundColor:"#ffcc00", borderRadius:"13px", padding: "10px"}} className="me-5 d-none d-lg-block">
          <div style={{color:"gray"}}>Get connected with us on social networks:</div>
          <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          >
            © 2022 Copyright: 
            <a className="text-reset bg-info fw-bold" href="https://www.linkedin.com/in/sertacgultekin/">
               sertacgltkn
            </a>
          </div>
        </div>

       {/*  <div>
          <a href="" className="me-4 text-reset">
            <MDBIcon  fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="linkedin" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="github" />
          </a>
        </div> */}
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon color="secondary" icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Next
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Node
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Express
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Lorem.
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Lorem.
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                Lorem.
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                Lorem.
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon color="secondary" icon="home" className="me-2" />
                Malatya/Turkey
              </p>
              <p>
                <MDBIcon color="secondary" icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon color="secondary" icon="phone" className="me-3" /> + 01
                lorem
              </p>
              <p>
                <MDBIcon color="secondary" icon="print" className="me-3" /> + 01
                lorem
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <span>sertacgltkn</span>
    </MDBFooter>
  );
}
