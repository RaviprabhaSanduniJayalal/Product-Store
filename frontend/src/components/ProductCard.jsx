import { EditIcon , DeleteIcon} from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React from 'react'
import { useProductStore } from '../store/product'; // Adjust the import path as necessary


export const ProductCard = ({product}) => {

    const textColor =useColorModeValue("gray.600","gray.200");
    const bg =useColorModeValue("white","gray.800");

    const {deleteProduct}=useProductStore();
    const toast=useToast();


    const handleDeleteProduct=async (pid) => {
      const {success,message} = await deleteProduct(pid);
      if(!success){
        toast({
          title: "Error",
          description: message,
          status:"error",
          duration:3000,
          isClosable:true,

        })
      }else(
        toast({
          title: "Success",
          description: message,
          status:"success",
          duration:3000,
          isClosable:true,
        })
      )

    }


  return (
    <Box
      shadow={"lg"}  
      rounded={"lg"}
      transition={"all .3s"}
      _hover={{ transform: "translateY(-10px)", shadow: "xl" }}
      overflow='hidden'
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl'  color={textColor} mb={4}>
               ${product.price}
            </Text>   

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} colorScheme={"blue"}/>
                <IconButton icon={<DeleteIcon />} onClick={()=>handleDeleteProduct(product._id)} colorScheme={"red"}/>
            </HStack>    
        </Box>    
    </Box>    
  );
}





export default ProductCard