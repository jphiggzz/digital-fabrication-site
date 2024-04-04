import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { storage, db } from '@/firebase/firestore/index'; // Ensure these imports match your Firebase config file paths
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export const useAddPrint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const addPrint = async (file: File, name: string, description: string) => {
    setIsLoading(true);
    try {
      // Correct usage of `storageRef` with `storage`
      const fileRef = storageRef(storage, `prints/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      await addDoc(collection(db, "prints"), { name, description, url });
      toast({
        title: "Print added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error adding print.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error adding document: ", error);
    }
    setIsLoading(false);
  };

  return { addPrint, isLoading };
};
