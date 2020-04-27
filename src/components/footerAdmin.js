import React from "react";
import { Navbar } from "react-bootstrap";

function Footer() {
  return (
    <Navbar fixed="bottom" className="footer">
      <div class="container">
        <div class="footer-widget">
          <div class="footer-widget-heading">
            <h3>Kwizz.guru</h3>
          </div>
          <ul>
            <li>
              <a href="/admin-faq">FAQ</a>
            </li>
            <li>
              <a
                href="https://github.com/alowa-apps/kwizz/issues/new/choose"
                target="_blank"
              >
                Having issues or idea?
              </a>
            </li>
            <li>
              <a href="http://www.alowa.app" target="_blank">
                Contact us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}

export default Footer;
