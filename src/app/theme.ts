export const TEXT_STYLES = {
    heading: {
        fontWeight: 600,
        fontSize: '36px'
    }

}

// Button Styles
export const BUTTON_STYLES = {
    primary: {},
    secondary: {}
}

// Text colors
export const COLORS = {

}

// Background
const THEMES = {
    light: {
        pan: {
            color: "#f4f4fd"
        },
        heading: {
            color: "#000000"
        }

    },
    dark: {}
}

// export function getTheme(themeOf: string, mode?: 'light' | 'dark' ) {
//     if (!mode) return THEMES['light'][themeOf].color;
//     return THEMES[mode][themeOf].color;
// }