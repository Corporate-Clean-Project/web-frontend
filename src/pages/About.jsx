import { useEffect, useState } from 'react';
import { getPageContent } from '../api/content';

const defaultContent = {
  heading: 'About Top Pristine Luxury Craft',
  intro:
    'Top Pristine delivers high-quality architectural solutions with uncompromising attention to detail. We take pride in every creation, big or small.',
  yearsExperience: 15,
  certifications: ['Fully Licensed & Insured', 'Master Guild Craft Certified'],
  materialTags: ['Bookmatched Marble', 'Custom Brass Joinery', 'Smart Ambient Lighting'],
};

export default function About() {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getPageContent('about-us')
      .then((data) => {
        if (mounted && data && Object.keys(data).length > 0) setContent(data);
      })
      .catch(() => {
        /* fall back to default content already set */
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-24 space-y-10">
      <div className="space-y-4">
        <span className="text-xs text-primary tracking-widest uppercase font-bold">About Us</span>
        <h1 className="font-display text-3xl lg:text-4xl">{content.heading}</h1>
        <p className="text-on-surface-variant leading-relaxed max-w-3xl">{content.intro}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container rounded-xl p-6">
          <p className="font-display text-3xl text-primary">{content.yearsExperience}+</p>
          <p className="text-sm text-on-surface-variant mt-1">Years of Experience</p>
        </div>
        <div className="bg-surface-container rounded-xl p-6 md:col-span-2">
          <h4 className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">
            Certifications
          </h4>
          <ul className="flex flex-wrap gap-2">
            {(content.certifications || []).map((c) => (
              <li key={c} className="px-3 py-1 rounded-full bg-surface-container-high text-xs">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">
          Signature Materials & Craft
        </h4>
        <ul className="flex flex-wrap gap-2">
          {(content.materialTags || []).map((tag) => (
            <li key={tag} className="px-3 py-1 rounded-full bg-surface-container-high text-xs">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {loading && <p className="hidden text-xs text-on-surface-variant">Loading latest content…</p>}
    </div>
  );
}
