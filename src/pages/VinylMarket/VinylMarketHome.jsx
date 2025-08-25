
import Vinyl from './assets/Vinyl.png';

import { useRef } from 'react';
import gsap from 'gsap';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function VinylMarketHome() {

    const container = useRef();

    useGSAP(() => {
        //rotate vinyl
        /* 
         gsap.to(".Vinyl-img", {
             rotation: 360,
             ease: "none",
             scrollTrigger: {
                 trigger: ".Vinyl-img",
                 start: "top bottom",
                 end: "bottom top",
                 scrub: true,
                 markers: true,
                 id: "rotate"
             }
         });
     
         //pin vinyl only when it reaches top of .middle
         gsap.to(".Vinyl-img", {
             scrollTrigger: {
                 trigger: ".middle",
                 start: "top top",
                 end: "bottom-=100px top",
                 pin: true,
                 pinSpacing: true,
                 scrub: true,
                 markers: true,
                 id: "pin"
             }
         });
     
         //makes text appear
         
         gsap.to(".h2text", {
             scrollTrigger: {
                 trigger: ".Vinyl-img",
                 start: "middle top",
                 end: "bottom bottom",
                 scrub: true,
                 markers: true,
                 id: "textappear",
                 toggleActions: "restart pause resume none"
             },
             opacity: 1,
             y: -100
         });
         */
    }, { scope: container });


    return (
        <div className="vm-homepage" ref={container}>
            <div className="vinyl-buffer" >
                <section className="intro">
                    <h1 className="title">VINYL MARKET</h1>
                    <p>Come See us this summer</p>
                </section>

                <section className="middle-top">
                    <div className="text-expo">
                        <div className="top-half">
                            <div className="img"></div>
                        </div>
                        <div className="bottom-half">

                            <h2 className="first circular-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h2>
                            <h2 className="second circular-text"> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
                            <h2 className="third circular-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h2>
                        </div>

                    </div>

                </section>
                <section className="middle-bottom">
                    <div className="vinyl-expo">
                        <div className="top-half">
                            <div className="vinyl-square"></div>
                            <div className="vinyl-square"></div>
                            <div className="vinyl-square"></div>
                        </div>
                        <div className="bottom-half">
                            <div className="vinyl-square"></div>
                            <div className="vinyl-square"></div>
                            <div className="vinyl-square"></div>
                        </div>
                    </div>
                </section>
                <section className="image-expo">
                    <div className="placeholder-img"></div>
                    <div className="placeholder-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <div className="placeholder-img-second"></div>
                    <div className="placeholder-text-second">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <div className="placeholder-img-third"></div>
                </section>
                <section className="footer">
                    <div className="top-half">
                        <div className="infiniteloop">  FRANCE LONDON ICELAND PARIS LOS ANGELES SAN FRANSISCO</div>
                    </div>
                    <div className="bottom-half">
                        <div className="logo left-half">VM</div>
                        <div className="right-half">
                            <div className="adress"></div>
                            <div className="socials"></div>
                        </div>
                    </div>

                </section>

            </div>
        </div>
    );
}