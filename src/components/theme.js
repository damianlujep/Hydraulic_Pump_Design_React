import {createTheme} from "@mui/material/styles"

let theme = createTheme( {
    palette: {
        primary: {
            main: '#3f51b5'
        },
        secondary: {
            main: '#f50057'
        }
    }
});

// theme = createTheme(theme, {
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
// })

export default theme;