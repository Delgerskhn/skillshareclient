import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useAppContext } from "../context/app";
import { AccountPopover } from "../components/popover";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { TagSearch } from "../components/forms/tag-search";
import TagSelect from "../components/forms/tag-select";
import { useAuth } from "../context/auth";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between"
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  btn: {
    marginRight: theme.spacing(1)
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { user } = useAuth();
  const { popularTags } = useAppContext();
  const { title } = props;
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="left"
            noWrap
          >
            {title}
          </Typography>
        </Link>
        {/*  <IconButton>
                <SearchIcon />
              </IconButton>*/}
        <div style={{ display: "flex" }}>
          {!user ? (
            <React.Fragment>
              <Link href="auth/login">
                <Button variant="outlined" size="small" className={classes.btn}>
                  Sign in
                </Button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <AccountPopover />
              <Link href="editor">
                <Button>
                  <BorderColorIcon color="#ba000d" />
                </Button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {popularTags.slice(0, 9).map(tag => (
          <Link
            color="inherit"
            noWrap
            key={tag.pk}
            variant="body2"
            href={'/?tag=' + tag.pk}
            className={classes.toolbarLink}
          >
            {tag.name}
          </Link>
        ))}
        {<TagSelect />}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string
};
