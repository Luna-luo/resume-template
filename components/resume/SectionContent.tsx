import { PropsWithChildren } from 'react';


const SectionContent: React.FC<PropsWithChildren<object>> = ({ children }) => {
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
              width: 100%;
              padding-left: 44px;
              position: relative;
          }

      `}</style>
    </>
  );
}

export default SectionContent;
