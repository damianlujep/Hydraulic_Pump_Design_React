import {createTheme} from "@mui/material/styles"

let theme = createTheme( {
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057'
        },

    }
});

theme = createTheme(theme, {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1920
        }
    }
//     components: {
//         MuiButton: {
//             variants: [
//                 {
//                     props: { variant: "secondary"},
//                     style: {
//                         backgroundColor: theme.palette.secondary.main
//                     }
//                 }
//             ]
//         },
//     }
})

export default theme;