
import { WithId } from './firebase';

export type Banner = WithId<{
    title: string;
    imageUrl: string;
    linkUrl: string;
    serviceType: string;
}>;

export type Testimonial = WithId<{
    customerName: string;
    testimonialText: string;
    imageURL: string;
}>;
