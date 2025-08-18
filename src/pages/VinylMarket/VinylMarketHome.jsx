
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
    
    gsap.to(".Vinyl-img", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
            trigger: ".Vinyl-img",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: true
        }
    });

    //pin vinyl only when it reaches top of .middle
    gsap.to(".Vinyl-img", {
        scrollTrigger: {
            trigger: ".middle",
            start: "top top",
            end: "bottom-=200px top",
            pin: true,
            pinSpacing: true,
            scrub: true,
            markers: true
        }
    });

    //ove vinyl up end of .middle
    gsap.to(".Vinyl-img", {
        y: -200,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: ".middle",
            start: "bottom-=300px top",
            end: "bottom-=200px top",
            scrub: true,
            markers: true
        }
    });
}, { scope: container });


    return (
        <div className="vm-homepage" ref={container}>
            <div className="backgroundimg" >
                <div className="bg-break">
                    <img
                        src={Vinyl}
                        alt="Vinyl"

                        className="Vinyl-img"
                    />
                </div>
                <section className="intro">
                    <h1>Vinyl Market</h1>
                    <p>Come See us this summer</p>
                </section>

                <section className="middle">
                    <h2 className="trigger">More than 35 exposants</h2>
                    <p>And more than 9999+ vinyl</p>
                </section>
                <section className="outro">
                    <div>
                        <h3>Need more information</h3>
                    </div>
                    <div>
                        <h3>Here is our Socail</h3>
                    </div>
                    <div >
                        <h3>Contact us:</h3>
                        <p>Your email:</p>
                        <p>what do you want us to know or ask us ?</p>
                    </div>
                </section>

            </div>
        </div>
    );
}