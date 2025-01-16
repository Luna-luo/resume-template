import { PropsWithChildren } from 'react';

interface SectionContentProps {}

const SectionContent: React.FC<PropsWithChildren<SectionContentProps>> = ({ children }) => {
  return (
    <>
    <div className="section-content text-gray-700">
      <div className="w">
        {children}
      </div>
    </div>
      <style jsx>{`
          .section-content {
              display: flex;
              align-items: center;
              justify-content: center;
          }
          .w {
              width: 95%;
              padding-left: 26px;
              position: relative;
          }

      `}</style>
      </>
  );
}

export default SectionContent;
