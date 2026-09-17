import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PokemonDetail } from '../api/pokemon';

export type RootStackParamList = {
    Home: undefined;
    PokemonList: undefined; // Or filters
    PokemonDetail: { pokemon:PokemonDetail  }; 
};


export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type PokemonDetailScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;