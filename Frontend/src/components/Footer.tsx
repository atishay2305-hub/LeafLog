import "../style.scss";
import bg3 from "../img/bg-img/3.jpg";

const Footer = () => {
  return (
    <footer
      className="footer-area bg-img"
      style={{ backgroundImage: `url(${bg3.src})` }}
    >
      <div className="main-footer-area">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="single-footer-widget">
                <div className="footer-logo mb-30">
                  <a href="#">
                    <img src="img/core-img/logo.png" alt="" />
                  </a>
                </div>
                {/* social media icons
                  <div className="social-info">
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-google-plus" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </div>*/}
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="single-footer-widget">
                <div className="widget-title"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
