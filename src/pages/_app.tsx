import {motion, AnimatePresence} from "framer-motion";
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import '../styles/global.module.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {
    }, []);

    return (
        <>
            <style jsx global>{`
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              html, body {
                max-width: 100vw;
                width: 100%;
                min-height: 100vh;
              }
              .slide-in {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #E75336;
                transform-origin: bottom;
              }
              .slide-out {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #E75336;
                transform-origin: top;
              }
      `}</style>
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
        </>
    );
};

export default App;
