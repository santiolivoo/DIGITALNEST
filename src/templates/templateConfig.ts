export interface TemplateConfig {
  layout: 'cards' | 'minimal' | 'carousel';
  colors: {
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    title: string;
    body: string;
  };
}

export interface TemplateEntry {
  name: string;
  preview: string;
  config: TemplateConfig;
}

export const templatesByType: Record<string, TemplateEntry[]> = {
  'Productos físicos': [
    {
      name: 'Clásica',
      preview: '/digitalnest.svg.svg',
      config: {
        layout: 'cards',
        colors: { background: '#1a1240', text: '#ffffff', accent: '#FFD944' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
    {
      name: 'Minimal',
      preview: '/next.svg',
      config: {
        layout: 'minimal',
        colors: { background: '#0a0a23', text: '#ffffff', accent: '#FFD944' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
    {
      name: 'Moderna',
      preview: '/vercel.svg',
      config: {
        layout: 'carousel',
        colors: { background: '#000000', text: '#ffffff', accent: '#FFD944' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
  ],
  Ropa: [
    {
      name: 'Fashion',
      preview: '/digitalnest2.svg',
      config: {
        layout: 'cards',
        colors: { background: '#1a1240', text: '#ffffff', accent: '#e1306c' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
    {
      name: 'Lookbook',
      preview: '/next.svg',
      config: {
        layout: 'minimal',
        colors: { background: '#0a0a23', text: '#ffffff', accent: '#e1306c' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
    {
      name: 'Trendy',
      preview: '/vercel.svg',
      config: {
        layout: 'carousel',
        colors: { background: '#000000', text: '#ffffff', accent: '#e1306c' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
  ],
  Servicios: [
    {
      name: 'Profesional',
      preview: '/digitalnest2.svg',
      config: {
        layout: 'cards',
        colors: { background: '#1a1240', text: '#ffffff', accent: '#50b2c0' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
    {
      name: 'Portfolio',
      preview: '/next.svg',
      config: {
        layout: 'minimal',
        colors: { background: '#0a0a23', text: '#ffffff', accent: '#50b2c0' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
    {
      name: 'Agencia',
      preview: '/vercel.svg',
      config: {
        layout: 'carousel',
        colors: { background: '#000000', text: '#ffffff', accent: '#50b2c0' },
        fonts: { title: 'Inter', body: 'Roboto' },
      },
    },
  ],
};

export function getTemplateByName(name: string): TemplateEntry | undefined {
  for (const list of Object.values(templatesByType)) {
    const t = list.find((tpl) => tpl.name === name);
    if (t) return t;
  }
  return undefined;
}