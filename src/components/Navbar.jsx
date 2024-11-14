import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Modal, Box } from "@mui/material";

function Navbar() {
const [isModalOpen, setIsModalOpen] = useState(false);

// Função para abrir modal com informações sobre o site
const handleOpenModal = () => setIsModalOpen(true);
const handleCloseModal = () => setIsModalOpen(false);

// Scroll para descer para seção dos produtos
const handleScrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
    }
};

return (
    <>
        <AppBar position="sticky" color="primary">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Estoque
            </Typography>
            <Button color="inherit" onClick={handleScrollToProducts}>
            Produtos
            </Button>
            <Button color="inherit" onClick={handleOpenModal}>
            Sobre nós
            </Button>
        </Toolbar>
        </AppBar>

    {/* Modal para "Sobre Nós" */}
    <Modal open={isModalOpen} onClose={handleCloseModal}>
    <Box
        sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 1,
        }}
    >
        <Typography variant="h6" component="h2" gutterBottom>
        Sobre o Sistema de Estoque
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
        Nosso sistema de estoque foi criado com o objetivo de facilitar o
        gerenciamento de produtos de empresas de diversos setores. Com uma
        interface intuitiva e funcionalidades robustas, ele permite a adição,
        edição e exclusão de produtos de forma simples e rápida.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
        Fundada em 2022, nossa empresa é especializada em soluções
        tecnológicas para pequenas e médias empresas. Nosso sistema de estoque
        é utilizado por mais de 500 clientes, ajudando-os a melhorar a
        eficiência e a organização do inventário.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
        Com foco na inovação e na satisfação dos nossos clientes, estamos
        sempre aprimorando nossas soluções para atender às necessidades de
        negócios modernos e dinâmicos.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCloseModal}>
        Fechar
        </Button>
    </Box>
    </Modal>
</>
);
}

export default Navbar;
