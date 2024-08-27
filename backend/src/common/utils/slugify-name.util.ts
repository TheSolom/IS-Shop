import slugify from 'slugify';

export default function slugifyName(name: string): string {
    if (!name) return null;

    return slugify(name, { lower: true, strict: true, trim: true });
}
