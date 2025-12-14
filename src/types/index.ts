// types.ts
export interface DomainCard {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  iconColor: string;
}

export interface SectorCard {
  image: string;
  title: string;
  description: string;
}

export interface TeamMember {
  role: string;
  description: string;
}

export interface PartnerLogo {
  name: string;
  logoUrl?: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
