const scrollToSection = (sectionId) => {
  const sectionElement = document.getElementById(sectionId);
  const offset = 64;
  if (sectionElement) {
    const targetScroll = sectionElement.offsetTop - offset;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }
};

export default scrollToSection;
