export function scrollToSection(sectionId: string, offset: number = 80): void {
  const element = document.getElementById(sectionId);
  
  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

export function handleNavigation(sectionId: string, offset?: number) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(sectionId, offset);
  };
}