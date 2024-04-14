import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AboutSection, ServicesSection, ContactSection } from './Sections';
import scrollToSection from './scrollToSection'

const ResearchEducationCollaborative = () => {
  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };
  return (
    <>
        <AboutSection scrollToSection={scrollToSection} />
        <ServicesSection handleSignIn={handleSignIn} handleSignUp={handleSignUp} />
        <ContactSection />
     </>   
  );
};

export default ResearchEducationCollaborative;
