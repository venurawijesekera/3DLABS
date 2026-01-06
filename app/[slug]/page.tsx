export const runtime = 'edge';

import { notFound } from 'next/navigation';
import { materials, services } from '@/data/content';
import MaterialTemplate from '../../components/MaterialTemplate';
import ServiceTemplate from '../../components/ServiceTemplate';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (materials[slug]) {
        return { title: `3D LABS - ${materials[slug].title}` };
    }
    if (services[slug]) {
        return { title: `3D LABS - ${services[slug].subtitle}` };
    }
    return { title: '3D LABS' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (materials[slug]) {
        return <MaterialTemplate data={materials[slug]} />;
    }

    if (services[slug]) {
        return <ServiceTemplate data={services[slug]} />;
    }

    return notFound();
}
