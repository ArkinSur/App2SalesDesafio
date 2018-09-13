import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';


export default class NovaFoto extends Component {
    render() {
        return (
            <View style={{ alignSelf: 'center' }}>
                <Image 
                    style={{ height: 43, width: 43 }}
                    source={{ uri: 'https://cdn0.iconfinder.com/data/icons/thin-photography/57/thin-368_photo_image_camera_take_shot-512.png' }}
                />
                <Text style={{ fontSize: 11 }}>Nova Foto</Text>
            </View>
        );
    }
}
