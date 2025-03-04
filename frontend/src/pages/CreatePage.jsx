import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product"; // Adjust the import path as necessary

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

const {createProduct} = useProductStore();

  const handleAddProduct = async() => {
    const{success,message}=await createProduct(newProduct);
    if(!success){
      toast({
        title:"Error",
        description:message,
        status:"error",
        duration:3000,
        isClosable:true
        });
      } else {
        toast({
          title:"Success",
          description:message,
          status:"success",
          duration:3000,
          isClosable:true
        });
      }
    setNewProduct({name:"",price:"",image:""});
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              name="name"
              placeholder="Product name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              name="price"
              type="number"
              placeholder="Product price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Product image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"}>
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;