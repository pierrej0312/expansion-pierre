import React from 'react';

interface PageProps {
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
    return (
        <>
            <style jsx global>{`
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              html, body {
                margin: 0;
                padding: 0;
                max-width: 100vw;
                width: 100%;
                min-height: 100vh;
              }
      `}</style>
            <div className="appContainer">{children}</div>
        </>
    );
};

export default Page;
