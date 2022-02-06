import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
    <>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
        </ListItem>
        {/*<ListItem button>*/}
        {/*    <ListItemIcon>*/}
        {/*        <ShoppingCartIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Orders" />*/}
        {/*</ListItem>*/}
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
        </ListItem>
        {/*<ListItem button>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BarChartIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Reports" />*/}
        {/*</ListItem>*/}
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
        </ListItem>
    </>
);

export const secondaryListItems = (
    <>
        <ListSubheader inset>Saved Projects</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Final Project" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last Project" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="202-08-20" />
        </ListItem>
    </>
);
