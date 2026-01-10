export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { services } from '@/data/content';
import MaterialTemplate from '../../components/MaterialTemplate';
import ServiceTemplate from '../../components/ServiceTemplate';

// Helper to map DB specs to template specs
const mapSpecs = (specs: any) => {
    const mapping: any = {
        density: { label: 'Density', icon: '/assets/img/icons/density.svg' },
        tensile_strength: { label: 'Tensile Strength', icon: '/assets/img/icons/tensile.svg' },
        elongation: { label: 'Elongation', icon: '/assets/img/icons/elongation.svg' },
        flexural_strength: { label: 'Flexural Strength', icon: '/assets/img/icons/flexural.svg' },
        temp_deflection: { label: 'Temp Deflection', icon: '/assets/img/icons/temp.svg' },
        hardness: { label: 'Hardness', icon: '/assets/img/icons/hard.svg' },
        print_temp: { label: 'Printing Temp', icon: '/assets/img/icons/print_temp.svg' },
        bed_temp: { label: 'Bed Temp', icon: '/assets/img/icons/bed_temp.svg' },
    };

    return Object.keys(specs).map(key => {
        if (mapping[key] && specs[key]) {
            return {
                label: mapping[key].label,
                value: specs[key],
                icon: mapping[key].icon
            };
        }
        return null;
    }).filter(item => item !== null);
};

// Helper to map DB properties to progress
const mapProgress = (props: any) => {
    const mapping: any = {
        strength: 'Strength',
        stiffness: 'Stiffness',
        durability: 'Durability',
        heat_resistance: 'Heat Resistance',
        chemical_resistance: 'Chemical Resistance',
        surface_quality: 'Surface Quality'
    };

    return Object.keys(props).map(key => {
        if (mapping[key] && props[key] > 0) {
            return {
                label: mapping[key],
                value: props[key]
            };
        }
        return null; // Don't show if 0 or unknown
    }).filter(item => item !== null);
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { env } = getRequestContext();
    const db = (env as any).DB;

    // Check DB for material
    let material = null;
    try {
        if (db) {
            const { results } = await db.prepare("SELECT * FROM materials WHERE slug = ?").bind(slug).all();
            if (results && results.length > 0) {
                material = results[0];
            }
        }
    } catch (e) {
        console.error("Metadata DB Error:", e);
    }

    if (material) {
        return { title: `3D LABS - ${material.long_name || material.name}` };
    }

    // Check static services
    if (services[slug]) {
        return { title: `3D LABS - ${services[slug].subtitle}` };
    }
    return { title: '3D LABS' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { env } = getRequestContext();
    const db = (env as any).DB;

    // 1. Try fetching from DB
    let materialData = null;
    try {
        if (db) {
            const { results } = await db.prepare("SELECT * FROM materials WHERE slug = ?").bind(slug).all();
            if (results && results.length > 0) {
                const m: any = results[0];

                // Parse JSON fields safely
                const properties = typeof m.properties === 'string' ? JSON.parse(m.properties) : m.properties;
                const specifications = typeof m.specifications === 'string' ? JSON.parse(m.specifications) : m.specifications;
                const applications = typeof m.applications === 'string' ? JSON.parse(m.applications) : m.applications;

                materialData = {
                    title: m.long_name || m.name,
                    subtitle: m.tag || 'Material',
                    description: m.description_2 || m.short_description,
                    image: m.main_image || m.image,
                    progress: mapProgress(properties || {}),
                    specs: mapSpecs(specifications || {}),
                    applications: {
                        text: applications?.description || '',
                        image: applications?.image || '',
                        list: applications?.list || []
                    },
                    // Default sliders (can be dynamic later if needed)
                    sliders: [
                        { img: '/assets/img/slider/1.webp', title: 'Concept Modeling', subtitle: 'Concept models are used to visualize ideas and concepts.' },
                        { img: '/assets/img/slider/2.webp', title: 'Functional Prototyping', subtitle: 'Functional prototypes are used to test the functionality of a design.' },
                        { img: '/assets/img/slider/3.webp', title: 'End-Use Parts', subtitle: 'End-use parts are used in the final product.' },
                        { img: '/assets/img/slider/4.webp', title: 'Manufacturing Tooling', subtitle: 'Manufacturing tooling is used to aid in the manufacturing process.' }
                    ]
                };
            }
        }
    } catch (e) {
        console.error("Page DB Error:", e);
    }

    if (materialData) {
        return <MaterialTemplate data={materialData} />;
    }

    // 2. Fallback to static services
    if (services[slug]) {
        return <ServiceTemplate data={services[slug]} />;
    }

    return notFound();
}
