import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>();

  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      .onSnapshot((q) => {
        const data = q.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(data);
      });
    return () => subscribe();
  }, []);
  
  /* Filtro por período */

  // useEffect(() => {
  //   const subscribe = firestore()
  //     .collection("products")
  //     .orderBy('quantity')
  //     .startAt(2)
  //     .endAt(3)
  //     .onSnapshot((q) => {
  //       const data = q.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];
  //       setProducts(data);
  //     });
  //   return () => subscribe();
  // }, []);

  /* Ordenação por campo */

  // useEffect(() => {
  //   const subscribe = firestore()
  //     .collection("products")
  //     .orderBy('description')
  //     .onSnapshot((q) => {
  //       const data = q.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];
  //       setProducts(data);
  //     });
  //   return () => subscribe();
  // }, []);

  /* Aplica um filtro */

  // useEffect(() => {
  //   const subscribe = firestore()
  //     .collection("products")
  //     .where('quantity', '==', 1)
  //     .onSnapshot((q) => {
  //       const data = q.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];
  //       setProducts(data);
  //     });
  //   return () => subscribe();
  // }, []);

  /* Busca os dados realtime */

  // useEffect(() => {
  //   const subscribe = firestore()
  //     .collection("products")
  //     .onSnapshot((q) => {
  //       const data = q.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];
  //       setProducts(data);
  //     });
  //   return () => subscribe();
  // }, []);

  /* Busca todos ao renderizar */
  
  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .get()
  //     .then((response) => {
  //       const data = response.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];
  //       setProducts(data);
  //     })
  //     .catch((error) => console.log(error))
  // }, []);

  /* BUSCAR UM UNIDO POR ID */

  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .doc("4FvTpmaj47t3kDkOQb5P")
  //     .get()
  //     .then((response) => {
  //       console.log({
  //         id: response.id,
  //         ...response.data()
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
