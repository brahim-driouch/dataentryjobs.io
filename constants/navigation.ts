import { NavItem } from "@/types/navigation";

export const mainNavigation: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Find Jobs',
    href: '/jobs',
    children: [
      {
        label: 'All Data Entry Jobs',
        href: '/jobs',
      },
      {
        label: 'Remote Jobs',
        href: '/jobs?location=remote',
      },
      {
        label: 'Entry Level Jobs',
        href: '/jobs?experience=entry',
      },
      {
        label: 'By Category',
        href: '#',
        children: [
          { label: 'Medical Data Entry', href: '/jobs?category=medical' },
          { label: 'Legal Data Entry', href: '/jobs?category=legal' },
          { label: 'E-commerce Data Entry', href: '/jobs?category=ecommerce' },
          { label: 'Financial Data Entry', href: '/jobs?category=finance' },
          { label: 'General Data Entry', href: '/jobs?category=general' },
        ],
      },
    ],
  },
  {
    label: 'Companies',
    href: '/companies',
    children: [
      { label: 'Browse Companies', href: '/companies' },
      { label: 'Featured Employers', href: '/companies?featured=true' },
      { label: 'Company Reviews', href: '/companies/reviews' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Data Entry Skills Guide', href: '/resources/skills' },
      { label: 'Resume Templates', href: '/resources/resumes' },
      { label: 'Interview Tips', href: '/resources/interview' },
      { label: 'Typing Speed Test', href: '/resources/typing-test' },
      { label: 'Career Advice', href: '/resources/career-advice' },
    ],
  },
];


export const employerNavigation: NavItem[] = [
  {
    label: 'Post a Job',
    href: '/employer/post-job',
    type: 'button',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Employer Dashboard',
    href: '/employer/dashboard',
  },
  {
    label: 'Find Candidates',
    href: '/employer/candidates',
  },
];

export const userNavigation: NavItem[] = [
  {
    label: 'My Profile',
    href: '/user/profile',
  },
  {
    label: 'Saved Jobs',
    href: '/user/saved-jobs',
  },
  {
    label: 'My Applications',
    href: '/user/applications',
  },
  {
    label: 'Job Alerts',
    href: '/user/alerts',
  },
];