export interface Slide {
    id: number;
    type: 'video' | 'image';
    src: string;
    alt: string;
    title: string;
    subtitle: string;
}