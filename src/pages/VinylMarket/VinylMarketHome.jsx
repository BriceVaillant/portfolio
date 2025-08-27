

import { useRef } from 'react';
import gsap from 'gsap';

import { useGSAP } from '@gsap/react';
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

export default function VinylMarketHome() {

    const container = useRef();

    useGSAP(() => {

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
            scale: 1.1
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
        tl.to(".img1", { yPercent: -200, rotation: -15, transformOrigin: "left bottom", scale: 1.2 }, 0.2);

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
        textTl.from(splitFirst.lines, { yPercent: 100, autoAlpha: 0, stagger: 0.2, duration: 0.4}, "+=0.15");

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
        gsap.from(".top-row", {
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
        gsap.from(".bottom-row", {
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


        //make the last section img dinamyc 
        // Image 1
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


    }, { scope: container });


    return (
        <div className="vm-homepage"  ref={container} >
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
                        <h2 className="first description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h2>
                        <h2 className="second description-text"> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
                        <h2 className="third description-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h2>
                    </div>

                </div>

            </section>
            <section className="middle-bottom">
                <div className="vinyl-expo">
                        <div className="vinyl-card top-row">
                            <div className="full-vinyl">
                                <div className="vinyl-cover"></div>
                                <div className="vinyl-disc"></div>
                                <div className="vinyl-disc vinyl-center"></div>
                            </div>
                        </div>
                        <div className="vinyl-card top-row">
                            <div className="full-vinyl">
                                <div className="vinyl-cover"></div>
                                <div className="vinyl-disc"></div>
                                <div className="vinyl-disc vinyl-center"></div>
                            </div>
                        </div>
                        <div className="vinyl-card top-row">
                            <div className="full-vinyl">
                                <div className="vinyl-cover"></div>
                                <div className="vinyl-disc"></div>
                                <div className="vinyl-disc vinyl-center"></div>
                            </div>
                        </div>
                        <div className="vinyl-card bottom-row">
                            <div className="full-vinyl">
                                <div className="vinyl-cover"></div>
                                <div className="vinyl-disc"></div>
                                <div className="vinyl-disc vinyl-center"></div>
                            </div>
                        </div>
                        <div className="vinyl-card bottom-row">
                            <div className="full-vinyl">
                                <div className="vinyl-cover"></div>
                                <div className="vinyl-disc"></div>
                                <div className="vinyl-disc vinyl-center"></div>
                            </div>
                        </div>
                        <div className="vinyl-card bottom-row">
                            <div className="full-vinyl">
                                <div className="vinyl-cover"></div>
                                <div className="vinyl-disc"></div>
                                <div className="vinyl-disc vinyl-center"></div>
                            </div>
                        </div>
                </div>
            </section>
            <section className="image-expo">
                <div className="placeholder-img"></div>
                <div className="placeholder-text">-Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <div className="placeholder-img-second"></div>
                <div className="placeholder-text-second">-Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div className="placeholder-img-third"></div>
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
    );
}