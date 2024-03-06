import React from "react";

import Hero from "../assets/images/marketing.jpg";
import "./Home.css";

function Home() {
    return (
        <>
            {/* <!-- Hero Section --> */}
            <div className="marketing-banner">
                <a href="#" className="marketing-banner__item">
                    <div className="marketing-banner__item__wrapper">
                        <div className="marketing-banner__item-bg">
                            <picture className="marketing-banner__item-img">
                                <img src={Hero} alt="Hero" style={{ "object-position": "50% 50%;" }} />
                            </picture>
                        </div>

                        <div className="marketing-banner__item-content">
                            <div className="marketing-banner__item-content__inner">
                                <h2>EXPERIENCE THE WINTER 24 SHOW</h2>
                                <div className="marketing-banner__item-content__buttonWrapper">
                                    <div className="marketing-banner__item-content__button hero__btn">Discover Now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </>
    );
}

export default Home;
