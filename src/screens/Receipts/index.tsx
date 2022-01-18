import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";
import storage from "@react-native-firebase/storage";

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState("");
  const [photoInfo, setPhotoInfo] = useState("");

  async function handleDeleteImage(path: string) {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        Alert.alert("Imagem deletada com sucesso!");
        listImages();
      });
  }

  async function listImages() {
    storage()
      .ref("images")
      .list()
      .then((res) => {
        const files: FileProps[] = [];
        res.items.forEach((file) => {
          files.push({
            name: file.name,
            path: file.fullPath,
          });
        });
        setPhotos(files);
      });
  }

  useEffect(() => {
    listImages();
  }, []);

  async function handleShowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL();
    setPhotoSelected(urlImage);
    const info = await storage().ref(path).getMetadata();
    setPhotoInfo(`Upload realizado em ${info.timeCreated}`);
  }

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>{photoInfo}</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
