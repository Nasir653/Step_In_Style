import React from 'react'
import "./Footer.scss";
const Footer = () => {
    return (
        <div className='my-footer'>


            <footer className="text-center text-lg-start bg-body-tertiary text-muted ">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="https://facebook.com" aria-label="Facebook" className="me-4 text-reset">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" className="me-4 text-reset">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://google.com" aria-label="Google" className="me-4 text-reset">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram" className="me-4 text-reset">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" className="me-4 text-reset">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com" aria-label="GitHub" className="me-4 text-reset">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>
                <section>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i> Step In Style
                                </h6>
                                <p>
                                    Let's Design Our Future
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                                <p><a href="#!" className="text-reset">Product 1</a></p>
                                <p><a href="#!" className="text-reset">Product 2</a></p>
                                <p><a href="#!" className="text-reset">Product 3</a></p>
                                <p><a href="#!" className="text-reset">Product 4</a></p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p><a href="#!" className="text-reset">Support</a></p>
                                <p><a href="#!" className="text-reset">Contact Us</a></p>
                                <p><a href="#!" className="text-reset">FAQ</a></p>
                                <p><a href="#!" className="text-reset">Careers</a></p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> Srinagar, Jammu & Kashmir</p>
                                <p><i className="fas fa-envelope me-3"></i> contact@styepinstyle.com</p>
                                <p><i className="fas fa-phone me-3"></i> +91-6006348676</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4 bg-light">
                    © <script>document.write(new Date().getFullYear());</script> Copyright:
                    <a className="text-reset fw-bold" href="https://yourwebsite.com">YourWebsite.com</a>
                </div>
            </footer>











        </div>
    )
}

export default Footer