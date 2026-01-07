export const materials: Record<string, any> = {
    pla: {
        title: 'PLA',
        subtitle: 'Polylactic Acid',
        image: '/assets/img/material/colors.webp',
        description: 'PLA is a biodegradable thermoplastic derived from renewable resources such as corn starch or sugarcane. It’s known for its ease of printing, low warping, and excellent surface finish making it ideal for prototypes, display models, and general purpose parts that don’t require high heat resistance.',
        progress: [
            { label: 'Strength', value: 55 },
            { label: 'Stiffness', value: 85 },
            { label: 'Durability', value: 60 },
            { label: 'Heat Resistance', value: 35 },
            { label: 'Chemical Resistance', value: 50 },
            { label: 'Surface Quality', value: 90 },
        ],
        specs: [
            { icon: '/assets/img/icons/density.svg', value: '1.24 g/cm³', label: 'Density' },
            { icon: '/assets/img/icons/tensile-strength.svg', value: '60 MPa', label: 'Tensile Strength' },
            { icon: '/assets/img/icons/elongation.svg', value: '6%', label: 'Elongation at Break' },
            { icon: '/assets/img/icons/flexural-modulus.svg', value: '80 MPa', label: 'Flexural Strength' },
            { icon: '/assets/img/icons/temp.svg', value: '~ 60 °C (HDT)', label: 'Heat Deflection Temperature' },
            { icon: '/assets/img/icons/hardness.svg', value: '83 Shore D', label: 'Hardness' },
            { icon: '/assets/img/icons/print-temp.svg', value: '190 – 220 °C', label: 'Printing Temperature' },
            { icon: '/assets/img/icons/bed-temp.svg', value: '45 – 60 °C', label: 'Bed Temperature' },
        ],
        applications: {
            text: 'PLA is a versatile material ideal for general purpose printing where precision, surface quality, and ease of use are priorities. It’s commonly chosen for non functional parts, presentation models, and creative design projects where strength and heat resistance are not critical.',
            list: [
                'Visual prototypes and concept models',
                'Architectural and educational models',
                'Mobile Responsiveness',
                'Household accessories and decor items',
                'Product design mock ups',
                'Low stress jigs and fixtures'
            ],
            image: '/assets/img/material/pzero.webp'
        },
        sliders: [
            { img: '/assets/img/sliders/robo.webp', title: 'Cosplay Helmet', subtitle: 'Cost Effective - Clean Print Surface' },
            { img: '/assets/img/3d-labs/gearwheel424x450.webp', title: 'Gear Wheel', subtitle: 'Light Weight/ Strong & Durable/ Cost Effective' },
            { img: '/assets/img/3d-labs/specsframe424x450.webp', title: 'Specs Frame', subtitle: 'Customizable/ Strong & Durable' },
            { img: '/assets/img/3d-labs/tire424x450.webp', title: 'Airless Tire', subtitle: 'Flexible/ Durable' },
        ]
    },
    // Add other materials here (abs, petg, etc.) copying the structure
};

export const services: Record<string, any> = {
    fdm: {
        title: 'Precision 3D Printing for Prototypes and End-Use Parts',
        subtitle: 'FDM 3D Print Service',
        description: 'Fused Deposition Modeling (FDM) is a reliable and cost-effective 3D printing technology ideal for prototypes and functional parts. It uses thermoplastic filaments such as ABS, PLA, PETG, and engineering-grade materials like Nylon and Carbon Fiber composites. Perfect for rapid prototyping, fixtures, and low-volume production components.',
        infoGrid: [
            { number: '01', title: 'Cost Effective Production', text: 'Ideal for affordable prototyping and low volume manufacturing without expensive tooling.' },
            { number: '02', title: 'Wide Material Range', text: 'Supports a variety of thermoplastics including ABS, PLA, PETG, Nylon, carbon fiber composites, PEEK and ULTEM 1010.' },
            { number: '03', title: 'Durable Functional Parts', text: 'Produces strong, mechanically stable components suitable for real-world testing and use.' },
            { number: '04', title: 'Fast Turnaround', text: 'Quick setup and print times make it perfect for rapid prototyping and iterative design development.' }
        ],
        infoImage: '/assets/img/plastics/centrifuge.webp',
        applications: {
            text: 'FDM 3D printing is widely used across industries for creating durable, precise, and cost-effective solutions, enabling faster product development, design validation, and customised manufacturing.',
            list: [
                'Product prototyping',
                'Mechanical and functional parts',
                'Architectural models',
                'Educational models and research',
                'End-use components',
                'Jigs, fixtures, and tooling holders'
            ],
            image: '/assets/img/3d-labs/bend948x600.webp'
        },
        capabilities: {
            text: 'Our FDM 3D printing service combines precision, reliability, and versatility to handle complex designs with ease. We prioritise accuracy and repeatability to ensure every print meets high-quality standards. Advanced features allow us to optimise prints for strength, durability, and material efficiency. Additionally, we provide professional finishing options to deliver polished, ready-to-use parts.',
            image: '/assets/img/plastics/bin.webp',
            list: [
                { label: 'Maximum build volume', value: '1000mm x 1000mm x 1300mm' },
                { label: 'Layer resolution range', value: '0.1mm - 0.8mm' },
                { label: 'Post-processing services', value: 'sanding, priming, painting, etc.' },
                { label: 'Max Nozzle Temp.', value: '500°C' },
                { label: 'Max Bed Temp.', value: '200°C' },
                { label: 'Max Chamber Temp.', value: '100°C' },
                { label: 'Wide Material Range', value: '10+' }
            ]
        },
        whatYouGet: {
            list: [
                'Industrial Grade machines.',
                'Consistent quality and precision.',
                'Quick turnaround times.',
                'Local support and consultation.'
            ],
            image: '/assets/img/3d-labs/engineering2.webp',
            btnText: 'FDM Materials',
            btnLink: '/material'
        }
    }
};
