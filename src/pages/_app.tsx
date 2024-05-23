import {motion, AnimatePresence} from "framer-motion";
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import '../styles/global.scss';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {
    }, []);

    return (
        <>
            <style jsx global>{`
              @font-face {
                font-family: AzoSansWebReg, sans-serif;
                src: url('../../public/assets/fonts/AzoSansTest-Regular.otf') format('opentype');
                font-weight: 400;
              }
              @font-face {
                font-family: AzoSansTest, sans-serif ;
                src: url('../../public/assets/fonts/AzoSansTest-light.otf') format('opentype');
                font-weight: 200;
              }

              @font-face {
                font-family: AzoSansTest, sans-serif ;
                src: url('../../public/assets/fonts/AzoSansTest-medium.otf') format('opentype');
                font-weight: 600;
              }

              @font-face {
                font-family: AzoSansTest, sans-serif ;
                src: url('../../public/assets/fonts/AzoSansTest-bold.otf') format('opentype');
                font-weight: 800;
              }
              @font-face {
                font-family: AzoSansTest, sans-serif ;
                src: url('../../public/assets/fonts/AzoSansTest-black.otf') format('opentype');
                font-weight: 900;
              }
                .slide-in {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #E75336;
                transform-origin: bottom;
                  z-index: 99999;
                }
                .slide-out {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #E75336;
                    transform-origin: top;
                  z-index: 99999;
                }
                /* custom scrollbar */
                ::-webkit-scrollbar {
                  width: 20px;
                }

                ::-webkit-scrollbar-track {
                  background-color: transparent;
                }

                ::-webkit-scrollbar-thumb {
                  background-color: #E75336;
                  border-radius: 20px;
                  border: 6px solid transparent;
                  background-clip: content-box;
                  transition: all 300ms ease-in-out;
                }

                ::-webkit-scrollbar-thumb:hover {
                  background-color: #4A414D;
                }
            `}</style>
            <Header></Header>
            <AnimatePresence mode="wait">
                <motion.div key={router.pathname}>
                    <Component {...pageProps} />
                    <motion.div
                        className="slide-in"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 0 }}
                        exit={{ scaleY:1 }}
                        transition={{ duration:1, ease: [0.22, 1, 0.36, 1] }}>
                    </motion.div>
                    <motion.div
                        className="slide-out"
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        exit={{ scaleY:0 }}
                        transition={{ duration:1, ease: [0.22, 1, 0.36, 1] }}>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
            <Footer />
        </>
    );
};

export default App;
