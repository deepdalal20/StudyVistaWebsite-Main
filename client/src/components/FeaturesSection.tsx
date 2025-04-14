import React from "react";
import Card3D from "./ui/Card3D"; // adjust path if needed

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: "fa-graduation-cap",
      title: "Expert Counseling",
      description:
        "Our experienced counselors provide personalized guidance to help you choose the right university and course.",
    },
    {
      icon: "fa-file-alt",
      title: "Visa Assistance",
      description:
        "We offer comprehensive visa support to ensure a smooth application process with high success rates.",
    },
    {
      icon: "fa-university",
      title: "University Admissions",
      description:
        "Get into your dream university with our tailored admisson support.",
    },
    {
      icon: "fa-home",
      title: "Accommodation Support",
      description:
        "We help you find the perfect place to stay that fits your preferences and budget.",
    },
  ];

  return (
    <section className="features" style={featuresStyle}>
      {/* Inline CSS injection */}
      <style>
        {`
    .feature-card-with-lines {
      position: relative;
      transition: all 0.3s ease-in-out;
    }

    .feature-card-with-lines::before,
    .feature-card-with-lines::after {
      content: "";
      position: absolute;
      transition: all 0.4s ease-in-out;
    }

    /* Left vertical blue line */
    .feature-card-with-lines::before {
      top: 0;
      left: 0;
      width: 2px;
      height: 0;
      background-color: #2f4a89;
    }

    /* Bottom horizontal orange line */
    .feature-card-with-lines::after {
      bottom: 0;
      left: 0;
      height: 2px;
      width: 0;
      background-color: orange;
    }

    .feature-card-with-lines:hover::before {
      height: 100%;
    }

    .feature-card-with-lines:hover::after {
      width: 100%;
    }
  `}
      </style>

      <div className="container">
        <div className="section-title" style={sectionTitleStyle}>
          <h2 data-aos="fade-up">Why Students Choose Us</h2>
        </div>
        <div className="features-grid" style={featuresGridStyle}>
          {features.map((feature, index) => (
            <Card3D
              key={index}
              glareEffect={true}
              borderGlow={true}
              depth={25}
              borderRadius={16}
              className="feature-card"
            >
              <div
                className="feature-card-with-lines"
                style={featureCardStyle}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="feature-icon" style={featureIconStyle}>
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="feature-title" style={featureTitleStyle}>
                  {feature.title}
                </h3>
                <p className="feature-desc" style={featureDescStyle}>
                  {feature.description}
                </p>
                <a href="#" className="feature-link" style={featureLinkStyle}>
                  Learn More{" "}
                  <i
                    className="fas fa-chevron-right"
                    style={{
                      marginLeft: "5px",
                      transition: "transform var(--transition-fast)",
                    }}
                  ></i>
                </a>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};

// Inline styles
const featuresStyle: React.CSSProperties = {
  padding: "var(--spacing-xl) 0",
  backgroundColor: "white",
};

const sectionTitleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "var(--spacing-xl)",
  position: "relative",
};

const featuresGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "var(--spacing-lg)",
};

const featureCardStyle: React.CSSProperties = {
  backgroundColor: "var(--light-bg)",
  borderRadius: "var(--border-radius-lg)",
  padding: "var(--spacing-lg)",
  boxShadow: "var(--shadow-md)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
};

const featureIconStyle: React.CSSProperties = {
  backgroundColor: "var(--primary)",
  color: "white",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  marginBottom: "var(--spacing-md)",
};

const featureTitleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  marginBottom: "var(--spacing-sm)",
};

const featureDescStyle: React.CSSProperties = {
  marginBottom: "var(--spacing-md)",
  flexGrow: 1,
};

const featureLinkStyle: React.CSSProperties = {
  color: "var(--secondary)",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  marginTop: "auto",
};

export default FeaturesSection;
