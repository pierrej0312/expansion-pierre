import React from 'react';

interface PageProps {
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
    return (
        <div className="appContainer">{children}</div>
    );
};

export default Page;
