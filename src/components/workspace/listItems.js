import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
    <div>
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
    </div>
);

export const secondaryListItems = (
    <div>
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
    </div>
);
