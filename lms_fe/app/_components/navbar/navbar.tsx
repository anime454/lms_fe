'use client'

import { AppBar, Toolbar, IconButton, Typography, Box, Button } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {/* <MenuIcon /> */}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>{window.location.href = "/"}}>
                    Loan Menagement System
                </Typography>
                <Box>
                    <Button color="inherit" onClick={()=>{
                        window.location.href = "/customer"
                    }}>Customer</Button>
                    <Button color="inherit" onClick={()=>{
                        window.location.href = "/loan"
                    }}>Loan</Button>
                    <Button color="inherit" onClick={()=>{
                        window.location.href = "/payment"
                    }} >Payment</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}