import React, { Component } from 'react';
import { View, 
         Text, 
         FlatList, 
         CameraRoll, 
         Image, 
         TouchableOpacity, 
         StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import NovaFoto from '../components/NovaFoto';


export default class CenaInicial extends Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props);

        this.state = { fotos: [] };
        this.carregaFotos();
    }

        componentWillUpdate() {
          this.carregaFotos();
        }

        carregaFotos = () => {
            CameraRoll.getPhotos({
                first: 3,
                assetType: 'Photos',
                groupName: 'DCIM'
              })
              .then(r => {
                const x = r.edges.map(item => item.node.image.uri);
    
                this.setState({ fotos: x });
              })
              .catch((error) => {
                 console.log(error);
              });
            };

    render() {
        return (
            <View>
                <HeaderBar />
                <View style={{ marginVertical: 14, paddingLeft: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>DESCRIÇÃO</Text>
                </View>
                <View style={{ backgroundColor: '#fff', padding: 8 }}>
                    <Text style={{ fontSize: 18 }}>
                        É um fato conhecido de todos que um leitor se distrairá com o conteúdo
                        do texto legível de uma página quando estiver olhando a sua diagramação
                    </Text>
                </View>
                <View style={{ marginVertical: 14, paddingLeft: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>PERIODICIDADE</Text>
                </View>
                <View style={{ backgroundColor: '#fff', padding: 3, paddingLeft: 10 }}>
                    <Text style={{ fontSize: 18 }}>
                        Uma vez a cada 3 meses
                    </Text>
                </View>
                <View style={{ marginVertical: 14, paddingLeft: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>ANEXO</Text>
                </View>
                <View style={styles.container}>
                <FlatList
                    data={this.state.fotos}
                    renderItem={item => {
                        if (item != null) {
                            return (
                            <View key={item.index} style={styles.item}>
                            <Image
                                key={item.index}
                                style={{ height: 75, width: 75 }}
                                source={{ uri: item.item }}
                            />
                            </View>
                            );
                        }
                        
                        if (item === null) {
                            return false;
                        }
                      }}
                    horizontal
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Foto')}
                            >
                                <NovaFoto />
                            </TouchableOpacity>
                        </View>
                    }
                />
    

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 7, 
        marginHorizontal: 1, 
        paddingLeft: 6
    },

    footer: {
        height: 77, 
        width: 77, 
        justifyContent: 'center', 
        paddingLeft: 5, 
        borderColor: '#00BFFF', 
        borderWidth: 2.3, 
        margin: 6 
    },

    container: {
        height: 87, 
        backgroundColor: '#fff', 
        flexDirection: 'row'
    }
});
