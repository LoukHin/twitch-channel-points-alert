export const kebabCase = (text: string) => {
    return text.replaceAll(' ', '-').toLowerCase()
}