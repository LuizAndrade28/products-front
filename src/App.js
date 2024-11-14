import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Grid2,
  Modal,
  Box,
} from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FiEdit, FiTrash } from "react-icons/fi";
import api from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock_quantity: "",
    description: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Função para abrir o modal e definir o produto selecionado
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const itemsPerPage = 6;

  const paginatedProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // Carregar produtos ao iniciar
    showProducts();
  }, []);

  // Exibir produtos
  async function showProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch {
      alert("No products");
    }
  }

  // Criar novo produto
  async function handleCreateProduct() {
    try {
      const response = await api.post("/products", newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        price: "",
        stock_quantity: "",
        description: "",
      });
    } catch {
      alert("Parece que você digitou algo errado ou o formulário está vazio. Tente novamente.");
    }
  }

  // Editar produto
  async function handleEditProduct() {
    try {
      const response = await api.put(
        `/products/${editingProduct.id}`,
        editingProduct
      );
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? response.data : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } catch {
      alert("Erro ao atualizar o produto, verifique se as informações estão corretas. OBS: O preço e a quantidade em estoque devem ser positivos.");
    }
  }

  // Excluir produto
  async function handleDeleteProduct(productId) {
    const confirmDelete = window.confirm(
      "Essa ação é irreversível, você deseja continuar e deletar o produto?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/products/${productId}`);
        setProducts(products.filter((product) => product.id !== productId));
      } catch {
        alert("Erro ao deletar o produto");
      }
    }
  }

  // Formatar preço
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // Atualizar estado dos inputs para criar ou editar produto
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Definir produto para edição
  const startEditingProduct = (product) => {
    setEditingProduct({ ...product });

    // Rolar suavemente para o formulário
    const formSection = document.getElementById("product-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 5 }}>
        <Grid2
          id="product-form"
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Formulário de criação/edição */}
          <Box
            sx={{
              my: 4,
              p: 2,
              borderRadius: 2,
              background: "linear-gradient(to right, #3f51b5, #2196f3)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ backgroundColor: "#fff", p: 4, borderRadius: 2 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Formulário de Produto
              </Typography>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Preço"
                  name="price"
                  variant="outlined"
                  margin="normal"
                  value={
                    editingProduct ? editingProduct.price : newProduct.price
                  }
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Quantidade"
                  name="stock_quantity"
                  variant="outlined"
                  margin="normal"
                  value={
                    editingProduct
                      ? editingProduct.stock_quantity
                      : newProduct.stock_quantity
                  }
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Descrição"
                  name="description"
                  variant="outlined"
                  margin="normal"
                  value={
                    editingProduct
                      ? editingProduct.description
                      : newProduct.description
                  }
                  onChange={handleChange}
                  inputProps={{ maxLength: 100 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={
                    editingProduct ? handleEditProduct : handleCreateProduct
                  }
                >
                  {editingProduct ? "Salvar Edição" : "Cadastrar Produto"}
                </Button>

                {editingProduct && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancelar Edição
                  </Button>
                )}
              </Grid>
            </Box>
          </Box>
        </Grid2>

        {/* Listagem de produtos */}
        <Box
          id="products-section"
          sx={{
            mb: 7,
            mt: 3,
            p: 2,
            borderRadius: 2,
            background: "linear-gradient(to right, #3f51b5, #2196f3)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ backgroundColor: "#fff", p: 4, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                Anterior
              </Button>
              <Typography variant="h5" align="center" gutterBottom>
                Lista de Produtos ({products.length})
              </Typography>
              <Button
                variant="outlined"
                onClick={handleNextPage}
                sx={{ ml: 2 }}
                disabled={(currentPage + 1) * itemsPerPage >= products.length}
              >
                Próximo
              </Button>
            </Box>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card variant="outlined" sx={{ minHeight: 170 }}>
                    <CardContent sx={{ pb: 0 }}>
                      <Typography variant="h6" component="div">
                        {product.name.length > 15
                          ? product.name.substring(0, 15) + "..."
                          : product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatPrice(product.price)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantidade: {product.stock_quantity}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ minHeight: 31 }}
                      >
                        {product.description.length > 10
                          ? product.description.substring(0, 10) + "..."
                          : product.description}
                        {product.description.length > 10 && (
                          <Button
                            size="small"
                            onClick={() => handleOpenModal(product)}
                            sx={{ alignItems: "center" }}
                          >
                            Ver mais
                          </Button>
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => startEditingProduct(product)}
                      >
                        <FiEdit /> Editar
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <FiTrash /> Excluir
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Modal para exibir a descrição completa */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="product-details-title"
        >
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
            {selectedProduct && (
              <>
                <Typography
                  id="product-details-title"
                  variant="h6"
                  component="h2"
                >
                  {selectedProduct.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  {formatPrice(selectedProduct.price)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Quantidade: {selectedProduct.stock_quantity}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2, lineBreak: "anywhere" }}
                >
                  {selectedProduct.description}
                </Typography>
                <Button
                  onClick={handleCloseModal}
                  sx={{ mt: 2 }}
                  variant="contained"
                  color="primary"
                >
                  Fechar
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Container>
      <Footer />
    </>
  );
}

export default App;
