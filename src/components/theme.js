import {createTheme} from "@mui/material/styles"

let theme = createTheme( {
    palette: {
        primary: {
            main: '#3f51b5',
            contrastText: '#fff'
        },
        secondary: {
            main: '#f50057',
        },
        customized: {
            grey: 'rgba(0,0,0,0.54)',
            headers: 'rgba(0,0,0,0.75)'
        }
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
    },
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginBottom: "-22.91px"
                }
            }
        },
    }
})

export default theme;