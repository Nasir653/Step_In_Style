import React from 'react'

const Footer = () => {
    return (
        <div>


            <footer class="text-center text-lg-start bg-body-tertiary text-muted">
                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div class="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="https://facebook.com" aria-label="Facebook" class="me-4 text-reset">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" class="me-4 text-reset">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="https://google.com" aria-label="Google" class="me-4 text-reset">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram" class="me-4 text-reset">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" class="me-4 text-reset">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com" aria-label="GitHub" class="me-4 text-reset">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </section>
                <section>
                    <div class="container text-center text-md-start mt-5">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">
                                    <i class="fas fa-gem me-3"></i>Your Company
                                </h6>
                                <p>
                                    Crafting high-quality solutions for all your digital needs.
                                </p>
                            </div>
                            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Products</h6>
                                <p><a href="#!" class="text-reset">Product 1</a></p>
                                <p><a href="#!" class="text-reset">Product 2</a></p>
                                <p><a href="#!" class="text-reset">Product 3</a></p>
                                <p><a href="#!" class="text-reset">Product 4</a></p>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p><a href="#!" class="text-reset">Support</a></p>
                                <p><a href="#!" class="text-reset">Contact Us</a></p>
                                <p><a href="#!" class="text-reset">FAQ</a></p>
                                <p><a href="#!" class="text-reset">Careers</a></p>
                            </div>
                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
                                <p><i class="fas fa-envelope me-3"></i> contact@company.com</p>
                                <p><i class="fas fa-phone me-3"></i> +1 555 123 4567</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="text-center p-4 bg-light">
                    © <script>document.write(new Date().getFullYear());</script> Copyright:
                    <a class="text-reset fw-bold" href="https://yourwebsite.com">YourWebsite.com</a>
                </div>
            </footer>











        </div>
    )
}

export default Footer