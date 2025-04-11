import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  backgroundImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' 
}) => {
  return (
    <div className="page-header" style={{
      ...pageHeaderStyle,
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
    }}>
      <div className="container">
        <div className="page-header-content" style={pageHeaderContentStyle} data-aos="fade-up">
          <h1 style={titleStyle}>{title}</h1>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
          <div className="breadcrumbs" style={breadcrumbsStyle}>
            <a href="/" style={breadcrumbLinkStyle}>Home</a>
            <span style={breadcrumbSeparatorStyle}><i className="fas fa-chevron-right"></i></span>
            <span style={breadcrumbCurrentStyle}>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const pageHeaderStyle: React.CSSProperties = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  padding: '120px 0',
  position: 'relative',
  color: 'white',
  textAlign: 'center',
  marginBottom: 'var(--spacing-xl)',
};

const pageHeaderContentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
};

const titleStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-xs)',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  maxWidth: '700px',
  margin: '0 auto var(--spacing-md)',
  opacity: 0.9,
};

const breadcrumbsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const breadcrumbLinkStyle: React.CSSProperties = {
  color: 'white',
  opacity: 0.8,
  transition: 'opacity var(--transition-fast)',
  fontWeight: 500,
};

const breadcrumbSeparatorStyle: React.CSSProperties = {
  margin: '0 var(--spacing-xs)',
  opacity: 0.5,
  fontSize: '0.7rem',
};

const breadcrumbCurrentStyle: React.CSSProperties = {
  opacity: 1,
  fontWeight: 600,
};

export default PageHeader;