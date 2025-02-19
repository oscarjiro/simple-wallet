import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MoneyIcon from "@mui/icons-material/Money";
import { Link } from "react-router";

interface Route {
    href: string;
    text: string;
}

const pages: Route[] = [
    {
        href: "/history",
        text: "History",
    },
    {
        href: "/stats",
        text: "Statistics",
    },
];

export default function Navigation() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "#fff" }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                ":hover": { opacity: 0.8 },
                                transition: "ease-in-out 150ms",
                            }}
                        >
                            <MoneyIcon
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                WALLET
                            </Typography>
                        </Box>
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map(({ href, text }) => (
                                <MenuItem
                                    key={href}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {text}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <MoneyIcon
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                WALLET
                            </Typography>
                        </Box>
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map(({ href, text }, key) => (
                            <Link
                                key={key}
                                to={href}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {text}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
