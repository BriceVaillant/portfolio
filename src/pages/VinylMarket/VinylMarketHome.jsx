

import { useRef } from 'react';
import gsap from 'gsap';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger, ScrollToPlugin, SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

export default function VinylMarketHome() {

    const container = useRef();

    useGSAP(() => {

        ScrollTrigger.defaults({
            markers: true,
        });

        new SplitText(".first", { type: "lines", linesClass: "lineChildfirst" });
        new SplitText(".second", { type: "lines", linesClass: "lineChildsecond" });
        new SplitText(".third", { type: "lines", linesClass: "lineChildthird" });


        //Make the first div rotate up

        gsap.to(".title", {
            scrollTrigger: {
                trigger: ".intro",
                scrub: 0.5,
                start: "top top",
                end: "+=100%",
                id: "rotate"
            },
            rotation: -20,
            yPercent: -50,
            transformOrigin: "left bottom",
            scale: 1.1
        });

        //Timeline for the img appearance

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".middle-top",
                scrub: true,
                pin: true,
                start: "top top",
                end: "+=170%",
                id: "pin"
            }
        });

        tl.to(".img1", { yPercent: -200, rotation: -5, transformOrigin: "left bottom" }, 0.1);

        tl.to(".img2", { yPercent: -200 }, 0.4);


        //Timeline for the text appearance under the img 1 2 3 

        let textTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".middle-top",
                scrub: true,
                start: "-20% top",
                end: "+=150%",
                id: "text-sequence"
            }
        });

        textTl.from(".lineChildfirst", { yPercent: 200, autoAlpha: 0, stagger: 0.2, duration: 0.5 });

        textTl.to(".lineChildfirst", { yPercent: -600, stagger: 0.2, duration: 0.5 }, "+=0.3");

        textTl.from(".lineChildsecond", { yPercent: 200, autoAlpha: 0, stagger: 0.2, duration: 1 }, "-=0.25");

        textTl.to(".lineChildsecond", { yPercent: -600, duration: 0.5 }, "+=0.6");

        textTl.from(".lineChildthird", { yPercent: 200, autoAlpha: 0, stagger: 0.2, duration: 1 }, "-=0.55");


        //Make the square appear from the left 

        gsap.from(".top-half .vinyl-square", {
            scrollTrigger: {
                trigger: ".middle-bottom",
                start: "-40% top",
                end: "+=100%",
                id: "top-half"
            },
            xPercent: -150,
            autoAlpha: 0,
            duration: 1,
            stagger: {
                each: 0.2,
                from: "end"
            },
            ease: "elastic.out(0.05,0)"
        });

        // and from the right
        gsap.from(".bottom-half .vinyl-square", {
            scrollTrigger: {
                trigger: ".middle-bottom",
                start: "-20% top",
                id: "bottom-half"
            },
            xPercent: 150,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.2,
            ease: "elastic.out(0.05,0)"
        });

    }, { scope: container });


    return (
        <div className="vm-homepage" ref={container}>
            <div className="vinyl-buffer" >
                <section className="intro">
                    <div className="title"><h1 >VINYL MARKET</h1></div>
                    <div className="intro-img"></div>
                </section>

                <section className="middle-top">
                    <div className="text-expo">
                        <div className="top-half">
                            <div className="img1"></div>
                            <div className="img2"></div>
                            <div className="img3"></div>
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
                            <div className="adress">
                                <h3>Contact</h3>
                                <p>Vaillant.brice@free.fr</p>
                            </div>
                            <div className="socials">
                                <h3>Social</h3>
                                <p>Twitter</p>
                                <p>Instagram</p>
                                <p>Facebook</p>
                            </div>
                        </div>
                    </div>

                </section>

            </div>
        </div>
    );
}