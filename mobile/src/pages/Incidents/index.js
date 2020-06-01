import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);

  //!!! IMPORTANTE!!!
  // PAGINAÇÃO
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Details', { incident });
  }
  //!!! IMPORTANTE!!!
  // PAGINAÇÃO
  async function loadIncidents() {
    //caso esteja ocorrendo uma requisição, evita que outra seja iniciada
    if (loading) {
      return;
    }
    //caso o número casos seja maior que zero e já carregou todos, evita outro loading
    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);
    const response = await api.get('incidents', {
      params: { page },
    });

    //copia os dados já carregados e anexa os carregados "agora"
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, []);

  //flatlist é necessário para renderizar listas
  //renderItem pega o o array que está no data... estudar depois
  //Intl > biblioteca de internacionalização, import no app.js
  //sempre que precisar passar parâmetros para alguma função quando tem um evento de click
  // tem que criar uma arrow function, caso contrário ela executa imediatamente
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
