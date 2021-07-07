import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import ListItemLinkProps from './interfaces';

const ListItemLink: React.FC<ListItemLinkProps> = ({icon, text, to }) => {
    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref: any) => <RouterLink to={to} ref={ref} />),
        [to],
      );
    
      return (
        <li>
          <ListItem button component={renderLink}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={text} />
          </ListItem>
        </li>
      );
}

export default ListItemLink
