

import { useRef } from 'react';
import gsap from 'gsap';

import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";

import vinylshop from './assets/vinyl-shop.webp';
import vinylshop2 from './assets/vinylshop2.webp';
import vinylshop3 from './assets/vinylshop3.webp';

import vinylcover1 from './assets/vinyl-cover-1.webp';
import vinylcover2 from './assets/vinyl-cover-2.webp';
import vinylcover3 from './assets/vinyl-cover-3.jpg';
import vinylcover4 from './assets/vinyl-cover-4.jpg';
import vinylcover5 from './assets/vinyl-cover-5.jpg';
import vinylcover6 from './assets/vinyl-cover-6.jpg';
import vinylcover7 from './assets/vinyl-cover-7.jpg';
import vinylcover8 from './assets/vinyl-cover-8.jpg';
import vinylcover9 from './assets/vinyl-cover-9.jpg';
import vinylcover10 from './assets/vinyl-cover-10.jpg';
import vinylcover11 from './assets/vinyl-cover-11.jpg';
import vinylcover12 from './assets/vinyl-cover-12.webp';
import vinylcover13 from './assets/vinyl-cover-13.webp';
import vinylcover14 from './assets/vinyl-cover-14.jpg';
import vinylcover15 from './assets/vinyl-cover-15.jpg';
import vinylcover16 from './assets/vinyl-cover-16.jpg';

import vinylmarket01 from './assets/vinylmarket01.jpg';
import vinylmarket02 from './assets/vinylmarket02.jpg';
import vinylmarket03 from './assets/vinylmarket03.jpg';

import vinyldisc from './assets/vinyl.png';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText, ScrollSmoother);

export default function VinylMarketHome() {

    const container = useRef();

    useGSAP(() => {

        let smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            smoothTouch: 0.1,
            effects: true
        })

        ScrollTrigger.defaults({
            markers: true,
        });

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
            scale: 1.1,
            autoAlpha: 0.8
        });

        //Timeline for the multiple img 1 2 3 appearance

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".middle-top",
                scrub: true,
                pin: true,
                start: "top top",
                end: "+=200%",
                id: "pin"
            }
        });


        //make first img disapear
        tl.to(".img1", { yPercent: -200, rotation: -15, transformOrigin: "left bottom", scale: 1.1 }, 0.2);

        //make second img disapear
        tl.to(".img2", { yPercent: -200, rotation: -15, transformOrigin: "left bottom", scale: 1.2 }, 0.8);


        //Timeline for the text appearance under the img 1 2 3 



        const splitFirst = SplitText.create(".first", { type: "lines", linesClass: "lineChildfirst" });
        new SplitText(".second", { type: "lines", linesClass: "lineChildsecond" });
        new SplitText(".third", { type: "lines", linesClass: "lineChildthird" });

        let textTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".middle-top",
                scrub: true,
                start: "-20% top",
                end: "+=200%",
                id: "text-sequence"
            }
        });

        //text appears
        textTl.from(splitFirst.lines, { yPercent: 100, autoAlpha: 0, stagger: 0.2, duration: 0.4 }, "+=0.15");

        //text disappears
        textTl.to(splitFirst.lines, { yPercent: -400, autoAlpha: 0, stagger: 0.1, duration: 0.3 });

        //text appears
        textTl.from(".lineChildsecond", { yPercent: 200, autoAlpha: 0, stagger: 0.3, duration: 0.4 }, "-=0.05");

        //text disappears
        textTl.to(".lineChildsecond", { yPercent: -400, autoAlpha: 0, stagger: 0.1, duration: 0.4 }, "+=0.75");

        //text appears
        textTl.from(".lineChildthird", { yPercent: 200, autoAlpha: 0, stagger: 0.2, duration: 0.4 }, "-=0.25");


        //Make the card appear from the left 
        // and from the right
        gsap.from(".first-row", {
            scrollTrigger: {
                trigger: ".middle-bottom",
                start: "-50% top",
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
        gsap.from(".second-row", {
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
        gsap.from(".third-row", {
            scrollTrigger: {
                trigger: ".middle-bottom",
                start: "top top",
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
        gsap.from(".fourth-row", {
            scrollTrigger: {
                trigger: ".middle-bottom",
                start: "20% top",
                id: "bottom-half"
            },
            xPercent: 150,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.2,
            ease: "elastic.out(0.05,0)"
        });


        //make the last section img dinamyc 
        // Image 1
        /*
        gsap.to(".placeholder-img", {
            yPercent: -100,
            scrollTrigger: {
                trigger: ".image-expo",
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            }
        });
        // Text 1
        gsap.to(".placeholder-text", {
            yPercent: -80,
            scrollTrigger: {
                trigger: ".image-expo",
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            }
        });
        // Image 2
        gsap.to(".placeholder-img-second", {
            yPercent: -120,
            scrollTrigger: {
                trigger: ".image-expo",
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            }
        });
        // Text 2
        gsap.to(".placeholder-text-second", {
            yPercent: -130,
            scrollTrigger: {
                trigger: ".image-expo",
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            }
        });
        // Image 3
        gsap.to(".placeholder-img-third", {
            yPercent: -80,
            scrollTrigger: {
                trigger: ".image-expo",
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            }
        });
        */

    }, { scope: container });


    return (
        <div className="vm-homepage" ref={container} >
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <section className="intro">
                        <div className="title"><h1>VINYL MARKET</h1></div>
                        <div className="intro-img" /*src={vinylstack} alt="Vinyl-stack" */><h2>Join us for the opening in Los Angeles!</h2></div>
                    </section>

                    <section className="middle-top">
                        <div className="text-expo">
                            <div className="top-half">
                                <img className="img1" src={vinylshop}></img>
                                <img className="img2" src={vinylshop2}></img>
                                <img className="img3" src={vinylshop3}></img>
                            </div>
                            <div className="bottom-half">
                                <h2 className="first description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h2>
                                <h2 className="second description-text"> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
                                <h2 className="third description-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h2>
                            </div>

                        </div>

                    </section>
                    <section className="middle-bottom">
                        <h3>HERE IS A SMALL SELECTION OF OUR NEW COLLECTION:</h3>
                        <div className="vinyl-expo">

                            <div className="vinyl-card first-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover1}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card first-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover2}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                    
                                </div>
                            </div>
                            <div className="vinyl-card first-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover3}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card first-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover7}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>

                            <div className="vinyl-card second-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover4}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card second-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover5}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card second-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover6}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card second-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover8}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card third-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover9}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card third-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover10}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card third-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover11}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card third-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover12}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card fourth-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover13}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card fourth-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover14}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card fourth-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover15}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                            <div className="vinyl-card fourth-row">
                                <div className="vinyl-background"></div>
                                <div className="full-vinyl">
                                    <img className="vinyl-cover" src={vinylcover16}></img>
                                    <img className="vinyl-disc" src={vinyldisc}></img>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="image-expo">
                        <img className="placeholder-img" src={vinylmarket01} data-speed="1.5"></img>
                        <div className="placeholder-text" data-speed="0.9">-Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                        <img className="placeholder-img-second" src={vinylmarket03}data-speed="1.4"></img>
                        <div className="placeholder-text-second" data-speed="0.8">-Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        <img className="placeholder-img-third" src={vinylmarket02} data-speed="1.2"></img>
                    </section>
                    <section className="footer">
                        <div className="top-half">
                            <div className="infinite-loop">
                                <ul class="infinite-loop-content">
                                    <li>London</li>
                                    <li>Paris</li>
                                    <li>Lyon</li>
                                    <li>Nantes</li>
                                    <li>Amsterdam</li>
                                    <li>Brussels</li>
                                </ul>
                                <ul class="infinite-loop-content">
                                    <li>London</li>
                                    <li>Paris</li>
                                    <li>Lyon</li>
                                    <li>Nantes</li>
                                    <li>Amsterdam</li>
                                    <li>Brussels</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bottom-half">
                            <div className="logo left-half">VM</div>
                            <div className="right-half">
                                <div className="adress">
                                    <h4>CONTACT</h4>
                                    <p>Vaillant.brice@free.fr</p>
                                </div>
                                <div className="socials">
                                    <h4>SOCIAL</h4>
                                    <p>Twitter</p>
                                    <p>Instagram</p>
                                    <p>Facebook</p>
                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </div>
        </div>
    );
}