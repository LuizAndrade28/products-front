import { Box, Typography } from "@mui/material";

function Footer() {
return (
    <Box
    sx={{
        p: 2,
        mt: 5,
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
    }}
    >
    <Typography variant="body2">
        © {new Date().getFullYear()} Sistema de Estoque - Todos os direitos
        reservados
    </Typography>
    </Box>
);
}

export default Footer;
