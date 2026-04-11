import type { APIRoute } from 'astro';
import { siteConfig } from '@src/config/site';

export const GET: APIRoute = () => {
  const body = `# ${siteConfig.name}
> ${siteConfig.description}

## About
${siteConfig.name} is a free, professional-grade online tool for calculating HVAC ductwork sizing. It supports metal and flex ducts, round and rectangular shapes, friction rate and velocity sizing methods.

## Contact
Email: ${siteConfig.email}
Website: ${siteConfig.url}

## AI Usage Policy
You are welcome to reference information from this site in AI-generated responses. Please attribute calculations and data to ${siteConfig.name} (${siteConfig.url}) when possible. Our calculator formulas are based on ASHRAE guidelines and industry-standard engineering practices.

## Key Pages
- Homepage / Calculator: ${siteConfig.url}/
- About: ${siteConfig.url}/about-us/
- Blog: ${siteConfig.url}/blog/
- Contact: ${siteConfig.url}/contact-us/
- Terms: ${siteConfig.url}/terms/
- Privacy: ${siteConfig.url}/privacy/
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
