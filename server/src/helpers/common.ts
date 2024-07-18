export const trimTag = (tag: string): string => {
    return tag.replace(/^"(.*)"$/, '$1');
};