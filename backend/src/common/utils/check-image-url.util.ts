export default async function isImageUrl(url: string): Promise<boolean> {
    try {
        const response: Response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) return false;

        const contentType: string = response.headers.get('content-type');
        return contentType?.startsWith('image/');
    } catch (error) {
        return false;
    }
}
