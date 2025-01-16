import React, {CSSProperties, useEffect, useRef, useState} from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({title}) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setLineWidth(headerRef.current.offsetWidth);
    }
  }, [title]);

  const style: CSSProperties & { [key: string]: string | number } = {
    '--line-width': `${lineWidth}px`,
  };

  return (
    <>
    <div className="section-title font-bold title"
         style={style}
    >
      <div className="wrapper">
        <div className="t" ref={headerRef}>
          {title}
        </div>
        <div
          className="bg-teal-600 "
          style={{
            width: 'var(--line-width)', // 动态宽度
            height: '4px',
            marginTop: '0px',
          }}
        ></div>
      </div>
    </div>
      <style jsx>{`
      .section-title {
              color: #449399;
              font-size: 24px;
              margin-bottom: 0 !important;
              display: flex;
              flex-direction: column;
          }
      .wrapper {
          padding-left: 36px;
          width: auto;
      }
      .t {
          display: inline-block;
          margin-bottom: 4px;
          width: auto;
      }
          `}
      </style>
    </>
  );
};

export default SectionHeader;
