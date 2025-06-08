/**
 * Colors configuration for the Hitch Hop mobile app
 * Synced with the design system from the web application
 */

export const Colors = {
  light: {
    // Base colors
    text: '#11181C', // Equivalent to --foreground in light mode
    background: '#FFFFFF', // --background
    tint: '#0a7ea4', // Primary brand color
    navbar: '#7875F8', // Custom navbar color
    navbarActive: '#4E4BDB', // Active tab background color
    
    // UI elements
    icon: '#687076', // --muted-foreground
    tabIconDefault: '#FFFFFF', // Changed to white for visibility on colored navbar
    tabIconSelected: '#FFFFFF', // Changed to white for visibility on colored navbar
    
    // Design system colors
    primary: '#11181C', // --primary
    primaryForeground: '#FCFCFC', // --primary-foreground
    secondary: '#F7F7F7', // --secondary
    secondaryForeground: '#11181C', // --secondary-foreground
    muted: '#F7F7F7', // --muted
    mutedForeground: '#8E8E8E', // --muted-foreground
    accent: '#F7F7F7', // --accent
    accentForeground: '#11181C', // --accent-foreground
    destructive: '#E54D2E', // --destructive
    border: '#EBEBEB', // --border
    input: '#EBEBEB', // --input
    ring: '#B4B4B4', // --ring
    
    // Additional semantic colors
    card: '#FFFFFF', // --card
    cardForeground: '#11181C', // --card-foreground
    popover: '#FFFFFF', // --popover
    popoverForeground: '#11181C', // --popover-foreground

    // Chart colors
    chart1: '#0090FF', // --chart-1
    chart2: '#00A3D1', // --chart-2
    chart3: '#0058AB', // --chart-3
    chart4: '#FFB224', // --chart-4
    chart5: '#FF8A00', // --chart-5

    // Primary palette shades
    primary50: '#E2E8FF',
    primary100: '#C7D0FF',
    primary200: '#A0AFFF',
    primary300: '#7A8EFF',
    primary400: '#3D5AFD',
    primary500: '#0A7EA4',

    // Text shades
    text50: '#F8F8F8',
    text100: '#EBEBEB',
    text200: '#E2E2E2',
    text300: '#DDDDDD',
    text400: '#B4B4B4',
    text500: '#A3A3A3',
    text600: '#8E8E8E',
    text700: '#707070',
    text800: '#5F5F5F',
    text900: '#444444',
    text950: '#343434',
  },
  dark: {
    // Base colors
    text: '#ECEDEE', // Equivalent to --foreground in dark mode
    background: '#151718', // --background
    tint: '#FFFFFF', // Primary brand color in dark mode
    navbar: '#7875F8', // Keep the same navbar color in dark mode
    navbarActive: '#4E4BDB', // Keep the same active tab color in dark mode
    
    // UI elements
    icon: '#9BA1A6', // --muted-foreground
    tabIconDefault: '#FFFFFF', // White icons for visibility
    tabIconSelected: '#FFFFFF', // White icons for selected state
    
    // Design system colors
    primary: '#EBEBEB', // --primary
    primaryForeground: '#343434', // --primary-foreground
    secondary: '#444444', // --secondary
    secondaryForeground: '#FCFCFC', // --secondary-foreground
    muted: '#444444', // --muted
    mutedForeground: '#B4B4B4', // --muted-foreground
    accent: '#444444', // --accent
    accentForeground: '#FCFCFC', // --accent-foreground
    destructive: '#FF6B4A', // --destructive
    border: 'rgba(255, 255, 255, 0.1)', // --border
    input: 'rgba(255, 255, 255, 0.15)', // --input
    ring: '#8E8E8E', // --ring
    
    // Additional semantic colors
    card: '#343434', // --card
    cardForeground: '#FCFCFC', // --card-foreground
    popover: '#343434', // --popover
    popoverForeground: '#FCFCFC', // --popover-foreground
    
    // Chart colors
    chart1: '#7B63FF', // --chart-1
    chart2: '#3FBBDB', // --chart-2
    chart3: '#FF8A00', // --chart-3
    chart4: '#CA5AFF', // --chart-4
    chart5: '#FF6B4A', // --chart-5
    
    // Primary palette shades (dark mode versions)
    primary50: '#E2E8FF',
    primary100: '#C7D0FF',
    primary200: '#A0AFFF',
    primary300: '#7A8EFF',
    primary400: '#3D5AFD',
    primary500: '#0A7EA4',
    
    // Text shades (dark mode)
    text50: '#F8F8F8',
    text100: '#EBEBEB',
    text200: '#E2E2E2',
    text300: '#DDDDDD',
    text400: '#B4B4B4',
    text500: '#A3A3A3',
    text600: '#8E8E8E',
    text700: '#707070',
    text800: '#5F5F5F',
    text900: '#444444',
    text950: '#343434',
  },
};
